import styles from '@/app/layout.module.css'; // レイアウト用のCSSモジュールをインポート
import './styles/global.css'; // グローバルCSSのインポート

export const metadata = {
  title: 'SucheDAS',
  description: 'public transportation Suchedule Data Acquisition System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={styles.html}>
      <head>
        <link rel="icon" href="src/app/imgs/favicon/SQ.svg" sizes="any" />
        {/* <title>Suchedas</title> */}
      </head>
      <body className={styles.body}>
        {children}
      </body>
    </html>
  );
};
