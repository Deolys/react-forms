import type { JSX } from 'react';
import styles from './form-tile.module.css';
import { IForm } from '@/store';

interface FormTileProps {
  formData: IForm;
  isLast: boolean;
}

export function FormTile({ formData, isLast }: FormTileProps): JSX.Element {
  return (
    <article className={`${styles.tile} ${isLast ? styles.last : ''}`}>
      <div className={styles.profileImg}>
        <img src={formData.profileImage} alt={formData.name} />
      </div>
      <p>
        <span>Name: </span>
        {formData.name}
      </p>
      <p>
        <span>Age: </span>
        {formData.age}
      </p>
      <p>
        <span>Email: </span>
        {formData.email}
      </p>
      <p>
        <span>Password: </span>
        {formData.password}
      </p>
      <p>
        <span>Confirm password: </span>
        {formData.confirmPassword}
      </p>
      <p>
        <span>Gender: </span>
        {formData.gender}
      </p>
      <p>
        <span>Country: </span>
        {formData.country}
      </p>
      <p>
        <span>T&C: </span>
        {formData.terms ? 'accepted' : 'not accepted'}
      </p>
    </article>
  );
}

export default FormTile;
