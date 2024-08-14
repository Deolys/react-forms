import type { JSX } from 'react';
import { UserSchema } from '@/models/user';
import styles from './form-tile.module.css';

interface FormTileProps {
  formData: UserSchema;
  isLast: boolean;
}

export function FormTile({ formData, isLast }: FormTileProps): JSX.Element {
  return (
    <div className={`${styles.tile} ${isLast ? styles.last : ''}`}>
      <div className={styles.profileImg}>
        <img src={formData.profileImage.toString()} alt={formData.name} />
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
        {formData.terms === 'on' ? 'accepted' : 'not accepted'}
      </p>
    </div>
  );
}

export default FormTile;
