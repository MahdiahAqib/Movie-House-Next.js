import path from 'path';
import fs from 'fs';
import styles from '../../../../styles/DirectorDetail.module.css';
import Link from 'next/link';

export default function MovieDirectorPage({ movie, director }) {
  if (!movie || !director) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Director of {movie.title}</h1>
      <div className={styles.card}>
        <h2>{director.name}</h2>
        <p>{director.biography}</p>
        <p>
          <strong>Back to Movie:</strong>{' '}
          <Link href={`/movies/${movie.id}`} className={styles.link}>
            {movie.title}
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { movies, directors } = JSON.parse(jsonData);

  const movie = movies.find((m) => m.id.toString() === params.id);
  const director = movie
    ? directors.find((d) => d.id === movie.directorId)
    : null;

  if (!movie || !director) {
    return { notFound: true };
  }

  return {
    props: {
      movie,
      director,
    },
    revalidate: 10,
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
    fallback: 'blocking',
  };
}
