import { NavLink } from 'react-router-dom';
import css from './main-menu.module.css';

export const MainMenu = () => {
  return (
    <>
      <header>
        <ul className={css.menu}>
          <li>
            <NavLink className={css.link} to={'/'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.link} to={'/movies'}>
              Movies
            </NavLink>
          </li>
        </ul>
      </header>
      <main></main>
    </>
  );
};

export default MainMenu;
