import type { JSX } from 'react';
import styles from './header.module.css';
import { NavLink } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <nav className={styles.navPanel}>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles['active']}` : '')}
            to="/uncontrolled-form"
          >
            Uncontrolled form
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? `${styles['active']}` : '')} to="/">
            Main
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${styles['active']}` : '')}
            to="/controlled-form"
          >
            Controlled form
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
