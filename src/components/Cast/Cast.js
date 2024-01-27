import { useParams } from 'react-router-dom';
import css from './cast.module.css';
import { useEffect, useState } from 'react';
import { getMovieCredits } from 'api/movies';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const imgURL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const {
          data: { cast },
        } = await getMovieCredits(movieId);
        // setCast(prevCast =>
        //   results?.length ? [...prevCast, ...results] : prevCast
        // );
        setCast(cast?.length ? cast : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const elements = cast.map(({ id, profile_path, name, character }) => (
    <li key={id} className={css.item}>
      <img
        className={css.cast_item_image}
        // src={profile_path}
        src={profile_path ? `${imgURL}/${profile_path}` : defaultImg}
        width={150}
        alt={name}
      />
      <p>{name}</p>
      <p>Character: {character}</p>
    </li>
  ));

  return (
    <>
      {error && <p className={css.error}>{error}</p>}
      {loading && <p>...Loading</p>}
      {cast && <ul>{elements}</ul>}
    </>
  );
};

export default Cast;
