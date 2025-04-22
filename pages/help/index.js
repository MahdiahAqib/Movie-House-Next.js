// pages/help/index.js
import Link from 'next/link';
import styles from '../../styles/Help.module.css';

export default function HelpHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Help Center</h1>
      <p className={styles.text}>Welcome to the Help Center. How can I help you?</p>
      <ul className={styles.list}>
        <li>
          <Link href="/help/faqs" className={styles.link}>
            FAQs
          </Link>
        </li>
        <li>
          <Link href="/help/contact" className={styles.link}>
            Contact
          </Link>
        </li>
        <li>
          <Link href="/help/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
