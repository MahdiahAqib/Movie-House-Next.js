import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';
import Link from 'next/link'; // Import Link for navigation
import styles from '../styles/Home.module.css';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  const handleBrowseGenres = () => {
    router.push('/genres');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Movie House 🎬</h1>
      <h2 className={styles.subheading}>Trending Movies</h2>
      <ul className={styles.movieList}>
  {trendingMovies.map((movie) => (
    <li key={movie.id} className={styles.movieItem}>
      <Link href={`/movies/${movie.id}`} passHref>
        <div className={styles.movieCard}>
          <h3 className={styles.movieTitle}>
            {movie.title} ({movie.releaseYear})
          </h3>
          <p>⭐ <strong>{movie.rating}</strong></p>
          <p className={styles.movieDescription}>{movie.description}</p>
        </div>
      </Link>
    </li>
  ))}
</ul>



      <button onClick={handleBrowseGenres} className={styles.browseButton}>
  Browse Genres
</button>
    </div>
  );
}

// SSG
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { movies } = JSON.parse(jsonData);

  const trendingMovies = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10,
  };
}
