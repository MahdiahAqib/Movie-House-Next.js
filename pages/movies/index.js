import path from 'path';
import fs from 'fs';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Movies.module.css'; 

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies =
    selectedGenre === 'all'
      ? movies
      : movies.filter((movie) => movie.genreId === selectedGenre);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Movies</h1>

      <div className={styles.filter}>
        <label htmlFor="genre">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.select}
        >
          <option value="all">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{movie.title}</h3>
            <p>⭐ {movie.rating}</p>
            <p>{movie.releaseYear}</p>
            <Link href={`/movies/${movie.id}`} className={styles.link}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { movies, genres } = JSON.parse(jsonData);

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 10,
  };
}

