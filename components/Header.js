// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

export default function Header() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.siteTitle}>
        <span className={styles.siteText}>Movie House</span>
      </div>
      <div className={styles.linkContainer}>
      <button
          onClick={() => router.push('/')}
          className={styles.homeButton}
          aria-label="Home"
        >
          Home
        </button>
        <Link href="/movies" className={styles.link}>Movies</Link>
        <Link href="/genres" className={styles.link}>Genres</Link>
        <Link href="/directors" className={styles.link}>Directors</Link>
        <Link href="/help" className={styles.link}>Help</Link>
      </div>
    </nav>
  );
}
