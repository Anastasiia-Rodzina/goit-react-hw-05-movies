import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import css from './movie-details.module.css';
import { useEffect, useState } from 'react';
import { getMovieDetails } from 'api/movies';

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const defaultImg =
    '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';
  const imgURL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { data } = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const goBack = () => navigate(from);

  return (
    <>
      {error && <p className={css.error}>{error}</p>}
      {loading && <p>...Loading</p>}
      <button onClick={goBack} type="button" className={css.button}>
        Go back
      </button>
      {movie && (
        <>
          <div className={css.movie_item_container}>
            <img
              className={css.movie_item_image}
              // src={movie.poster_path}

              src={
                movie.poster_path
                  ? `${imgURL}/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt={movie.title}
            />
            <div className={css.movie_item_info}>
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast" state={{ from }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;
