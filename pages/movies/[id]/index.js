import path from 'path';
import fs from 'fs';
import styles from '../../../styles/MovieDetail.module.css';
import Link from 'next/link';

// pages/movies/[id]/index.js
export default function MovieDetailPage({ movie, genre, director }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      <div className={styles.details}>
        <p><strong>⭐ Rating:</strong> {movie.rating}</p>
        <p><strong>🎬 Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>📽️ Genre:</strong> {genre}</p>
        <p>
          <strong>🎥 Director:</strong>{' '}
          <Link href={`/movies/${movie.id}/director`} className={styles.directorLink}>
            {director}
          </Link>
        </p>
        <p className={styles.description}>{movie.description}</p>
      </div>
    </div>
  );
}


export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { movies, genres, directors } = JSON.parse(jsonData);

  const movie = movies.find((m) => m.id.toString() === params.id);
  if (!movie) {
    return { notFound: true };
  }

  const genre = genres.find((g) => g.id === movie.genreId);
  const director = directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      movie,
      genre: genre ? genre.name : 'Unknown',
      director: director ? director.name : 'Unknown',
    },
    revalidate: 10, // Revalidate every 10 seconds
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { movies } = JSON.parse(jsonData);

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // Block until the page is generated
  };
}
