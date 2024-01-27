import { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import css from './searchinput.module.css';

const SearchInput = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({
      search: '',
    });
  };

  const searchId = useMemo(() => nanoid(), []);

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <button type="submit" className={css.button}>
        <span className={css.button_label}>Search</span>
      </button>
      <label htmlFor={searchId}></label>
      <input
        id={searchId}
        ref={inputRef}
        onChange={handleChange}
        value={state.search}
        className={css.input}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
    </form>
  );
};

export default SearchInput;
