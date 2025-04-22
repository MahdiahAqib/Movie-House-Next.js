// pages/genres/index.js
import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import styles from '../../styles/Genres.module.css';

export default function Genres({ genres }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎭 Browse Genres</h1>
      <div className={styles.grid}>
        {genres.map((genre) => (
          <div key={genre.id} className={styles.card}>
            <Link href={`/genres/${genre.id}`} className={styles.genreLink}>
              {genre.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// SSR
export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { genres } = JSON.parse(jsonData);

  return {
    props: {
      genres,
    },
  };
}
