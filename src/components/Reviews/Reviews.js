import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from 'api/movies';
import css from './reviews.module.css';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const imgURL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const {
          data: { results },
        } = await getMovieReviews(movieId);
        // setCast(prevCast =>
        //   results?.length ? [...prevCast, ...results] : prevCast
        // );
        setReviews(results?.length ? results : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    {
      /* <p>We don`t have any reviews for this movie</p> */
    }

    fetchReviews();
  }, [movieId]);

  const elements = reviews.map(({ id, author, content }) => (
    <li key={id} className={css.item}>
      <b>Author: {author}</b>
      <p>{content}</p>
    </li>
  ));

  return (
    <>
      {error && <p className={css.error}>{error}</p>}
      {loading && <p>...Loading</p>}
      {Boolean(reviews.length) && <ul>{elements}</ul>}
    </>
  );
};

export default Reviews;
