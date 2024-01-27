import { getTrendingMovies } from "api/movies";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
        try {
            setLoading(true);
            const { data: {results}, } = await getTrendingMovies();
            setMovies(results?.length ? results : []);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    fetchMovie();
}, []);

const elements = movies.map(({id, title}) => (<li key={id} >
         <Link to={`/movies/${id}`} state={{from: location}}>{title}</Link>
         </li>));
    return (
        <>
        {error && <p >{error}</p>}
        {loading && <p>...Loading</p>}
        {Boolean(elements.length) && (<ol >
            {elements}
        </ol>)}
    </>
    )
}
export default TrendingMovies;