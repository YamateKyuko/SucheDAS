
import styles from './styles/nav.module.css';
import logostyles from '../styles/logo.module.css';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className={styles.header}>
        <button className={styles.return}></button>
        <div>
          <div className={logostyles.logo}>
            <span>S</span>
            <span>u</span>
            <span>c</span>
            <span>h</span>
            <span>e</span>
            <span>D</span>
            <span>A</span>
            <span>S</span>
          </div>
        </div>
        
        <details className={styles.details}>
          <summary className={styles.summary}>
          </summary>
          <div>
            <p>
              {/* ないよう は ないよう */}
            </p>
          </div>
        </details>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>(c) SucheDAS by Yamakyu</p>
        <p>
          本アプリケーションが利用する公共交通データは、<br />
          公共交通オープンデータセンターにおいて提供されるものです。<br />
          公共交通事業者により提供されたデータを元にしていますが、<br />
          必ずしも正確・完全なものとは限りません。<br />
          本アプリケーションの表示内容について、<br />
          公共交通事業者への直接の問合せは行わないでください。<br />
          本アプリケーションに関するお問い合わせは、<br />
          以下のメールアドレスにお願いします。<br />
        </p>
        <p>
          <a href="mailto:y0896406@gmail.com">y0896406@gmail.com</a>
        </p>
        
      </footer>
    </>
  );
}