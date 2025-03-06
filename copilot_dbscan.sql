---- filepath: /path/to/dbscan.sql
CREATE OR REPLACE FUNCTION run_dbscan(eps DOUBLE PRECISION, minpts INTEGER)
RETURNS TABLE (point_id INT, cluster_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
  c INT := 0;  -- クラスター番号を割り当てるためのカウンタ
  rec RECORD;
BEGIN
  -- 分類状態を保持するための一時テーブル（POINT_IDに加え、クラスターIDと訪問フラグを格納）
  CREATE TEMP TABLE visited (
    point_id   INT PRIMARY KEY,
    cluster_id INT,
    visited    BOOLEAN DEFAULT FALSE
  ) ON COMMIT DROP;

  -- 分類対象となる全レコードを挿入
  INSERT INTO visited (point_id)
    SELECT id FROM your_table;  -- あなたのテーブル/カラムに合わせて変更

  -- メインループ: 未訪問のポイントについて近傍検索・クラスタ拡張
  FOR rec IN SELECT point_id FROM visited LOOP
    IF (SELECT visited FROM visited WHERE point_id = rec.point_id) THEN
      CONTINUE;  -- すでに訪問済みなら次へ
    END IF;

    -- 訪問フラグを立てる
    UPDATE visited 
       SET visited = TRUE 
     WHERE point_id = rec.point_id;

    -- regionQuery相当: 範囲内の近傍ポイントを一時テーブルに格納
    CREATE TEMP TABLE neighbors ON COMMIT DROP AS
      SELECT v.point_id
        FROM visited v
        JOIN your_table t ON t.id = v.point_id
       WHERE ST_DWithin(
         (SELECT geom FROM your_table WHERE id = rec.point_id),
         t.geom,
         eps
       );

    IF (SELECT COUNT(*) FROM neighbors) < minpts THEN
      -- 近傍が少なすぎる場合はノイズ扱い（cluster_id = -1 とする）
      UPDATE visited 
         SET cluster_id = -1
       WHERE point_id = rec.point_id;
    ELSE
      -- 新たにクラスタを発見したのでカウンタを1増やし、クラスターを拡張
      c := c + 1;
      PERFORM expand_cluster(rec.point_id, c, eps, minpts);
    END IF;
  END LOOP;

  -- 計算結果を返す
  RETURN QUERY
  SELECT point_id, COALESCE(cluster_id, -1)  -- cluster_id がNULLのものは未分類扱い
    FROM visited;
END;
$$;

-- クラスターを拡張するためのサブ関数
CREATE OR REPLACE FUNCTION expand_cluster(
    start_id INT,
    cluster_no INT,
    eps DOUBLE PRECISION,
    minpts INT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  current_pt RECORD;
  npt RECORD;
BEGIN
  -- 開始ポイントを与えられたクラスタに格納
  UPDATE visited
     SET cluster_id = cluster_no
   WHERE point_id = start_id;

  -- 拡張候補ポイントをまとめる一時テーブル
  CREATE TEMP TABLE to_process ON COMMIT DROP AS
    SELECT point_id
      FROM visited
     WHERE point_id = start_id;

  -- 拡張候補がなくなるまで繰り返す
  WHILE (SELECT COUNT(*) FROM to_process) > 0 LOOP
    FOR current_pt IN SELECT point_id FROM to_process LOOP
      -- 今取り出した拡張候補は、もう処理済みなので一覧から削除
      DELETE FROM to_process WHERE point_id = current_pt.point_id;

      -- 近傍ポイントを取得
      CREATE TEMP TABLE new_neighbors ON COMMIT DROP AS
        SELECT v.point_id
          FROM visited v
          JOIN your_table t ON t.id = v.point_id
         WHERE ST_DWithin(
           (SELECT geom FROM your_table WHERE id = current_pt.point_id),
           t.geom,
           eps
         );

      -- もし近傍ポイント数が十分多ければ、対象領域をさらに広げる
      IF (SELECT COUNT(*) FROM new_neighbors) >= minpts THEN
        FOR npt IN SELECT point_id FROM new_neighbors LOOP
          -- 未訪問なら訪問フラグを立て、処理キューに入れる
          IF NOT (SELECT visited FROM visited WHERE point_id = npt.point_id) THEN
            UPDATE visited SET visited = TRUE WHERE point_id = npt.point_id;
            INSERT INTO to_process
              SELECT npt.point_id
              WHERE NOT EXISTS (
                SELECT 1 FROM to_process WHERE point_id = npt.point_id
              );
          END IF;

          -- まだクラスタに属していない、またはノイズとされていた場合はクラスタに追加
          IF (SELECT cluster_id FROM visited WHERE point_id = npt.point_id) IS NULL
             OR (SELECT cluster_id FROM visited WHERE point_id = npt.point_id) = -1 THEN
            UPDATE visited
               SET cluster_id = cluster_no
             WHERE point_id = npt.point_id;
          END IF;
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;
END;
$$;