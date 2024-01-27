import { Link, useLocation } from 'react-router-dom';

const SearchList = ({ items }) => {
  const location = useLocation();

  const elements = items.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  ));
  return <ol>{elements}</ol>;
};

export default SearchList;
