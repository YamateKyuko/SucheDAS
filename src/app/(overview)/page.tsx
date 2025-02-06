import Link from 'next/link';
import styles from '@/app/(overview)/app.module.css';
import logoStyles from '@/app/styles/logo.module.css';

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        <h1>
          <Link href='/bus'>
            <div className={logoStyles.logo}>
              <span>S</span>
              <span>u</span>
              <span>c</span>
              <span>h</span>
              <span>e</span>
              <span>D</span>
              <span>A</span>
              <span>S</span>
            </div>
          </Link>
          
        </h1>

        
      </main>
      
      <footer>
        <p>© 2024 yamakyu</p>
      </footer>
    </>
  );
};