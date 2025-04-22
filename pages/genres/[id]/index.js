// pages/genres/[id].js
import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import styles from '../../../styles/GenreMovies.module.css';

export default function GenrePage({ genre, movies }) {
  if (!genre) {
    return <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Genre not found</h1>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎬 Movies in {genre.name}</h1>

      {movies.length === 0 ? (
        <p>No movies available in this genre.</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.card}>
              <Link href={`/movies/${movie.id}`} className={styles.movieTitle}>
                {movie.title} ({movie.releaseYear}) - ⭐ {movie.rating}
              </Link>
              <p className={styles.description}>{movie.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context)
{
    const genreId = context.params.id;
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const { genres, movies } = JSON.parse(jsonData);

    const genre = genres.find((g => g.id === genreId))
    const filteredMovies = movies.filter((movie => movie.genreId === genreId))

    return {
        props:
        {
            genre: genre || null,
            movies: filteredMovies,
        },
    };
}