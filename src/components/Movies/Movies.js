import SearchList from 'components/SearchList/SearchList';
import SearchInput from 'components/SearchInput/SearchInput';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchingMovies } from 'api/movies';
import css from './movies.module.css';

const Movies = () => {
  // const [searchingMovies, setSearchingMovies] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  // console.log('search:', search);
  // const page = searchParams.get('page');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const {
          data: { results },
        } = await getSearchingMovies(search);
        setMovies(prevMovies =>
          results?.length ? [...prevMovies, ...results] : prevMovies
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchMovies();
    }
  }, [search]);

  const handleSearch = ({ search }) => {
    setSearchParams({ search });
    setMovies([]);
  };

  return (
    <>
      <SearchInput onSubmit={handleSearch} />
      {error && <p className={css.error}>{error}</p>}
      {loading && <p>...Loading</p>}
      {Boolean(movies.length) && <SearchList items={movies} />}
    </>
  );
};

export default Movies;
