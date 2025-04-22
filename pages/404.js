// pages/404.js
import Link from 'next/link';
import styles from '../styles/NotFound.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className={styles.button}>
        Go Home
      </Link>
    </div>
  );
}
