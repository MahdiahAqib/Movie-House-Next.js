import useSWR from 'swr';
import Link from 'next/link';
import styles from '../../styles/Directors.module.css'; 

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/api/movies', fetcher);

  if (error) return <div>Failed to load directors. {error.message}</div>;
  if (!data) return <div>Loading Directors...</div>;

  const { directors, movies } = data;

  const directorsWithMovies = directors.map((director) => {
    const directedMovies = movies.filter((movie) => movie.directorId === director.id);
    return {
      ...director,
      movies: directedMovies,
    };
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎬 Movie Directors</h1>
      <div className={styles.grid}>
        {directorsWithMovies.map((director) => (
          <div key={director.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{director.name}</h3>
            <p className={styles.biography}>{director.biography}</p>
            <p>
              <strong>Movies Directed:</strong>
              <ul>
                {director.movies.map((movie) => (
                  <li key={movie.id}>
                    <Link href={`/movies/${movie.id}`} className={styles.movieLink}>
                      {movie.title} ({movie.releaseYear})
                    </Link>
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
