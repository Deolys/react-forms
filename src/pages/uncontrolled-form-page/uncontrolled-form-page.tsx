import { type JSX } from 'react';
import { Header } from '@/components/header';
import styles from '@/styles/form-pages.module.css';
import { ErrorMessage } from '@/components/error-message';
import { PasswordStrength } from '@/components/password-strength';
import { useAppSelector } from '@/store/hooks';
import useUncontrolledForm from '@/hooks/use-uncontrolled-form';
import { blockInvalidChar } from '@/utils/block-invalid-char-number';

export function UncontrolledFormPage(): JSX.Element {
  const { errors, handleInputChange, handleSubmit, isDisabled, passwordRef } =
    useUncontrolledForm();
  const countriesData = useAppSelector((state) => state.forms.countries);

  return (
    <div className={styles.wrapperUncontrolled}>
      <Header />
      <h1 className={styles.formTitle}>Uncontrolled components Form</h1>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              onChange={handleInputChange}
            />
            {errors.name && <ErrorMessage text={errors.name} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type="number"
              name="age"
              onKeyDown={blockInvalidChar}
              onChange={handleInputChange}
            />
            {errors.age && <ErrorMessage text={errors.age} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" onChange={handleInputChange} />
            {errors.email && <ErrorMessage text={errors.email} />}
          </div>
          <div className={`${styles.field} ${styles.bigField}`}>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" onChange={handleInputChange} />
            <div className={styles.strength}>
              <div className={styles.raw}>
                <PasswordStrength password={passwordRef.current} />
              </div>
            </div>
            {errors.password && <ErrorMessage text={errors.password} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <ErrorMessage text={errors.confirmPassword} />}
          </div>
          <div className={styles.field}>
            <p>Select gender:</p>
            <div className={styles.raw}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleInputChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleInputChange}
              />
              <label htmlFor="female">Female</label>
            </div>
            {errors.gender && <ErrorMessage text={errors.gender} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="profileImage">Profile Image:</label>
            <input type="file" id="profileImage" name="profileImage" onChange={handleInputChange} />
            {errors.profileImage && <ErrorMessage text={errors.profileImage} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="country">Choose a country:</label>
            <input
              type="text"
              list="countries"
              id="country"
              name="country"
              onChange={handleInputChange}
            />
            <datalist id="countries">
              {countriesData.map((name) => {
                return <option key={name} value={name} />;
              })}
            </datalist>
            {errors.country && <ErrorMessage text={errors.country} />}
          </div>
          <div className={`${styles.field} ${styles.smallField}`}>
            <div className={styles.raw}>
              <input id="terms" name="terms" type="checkbox" onChange={handleInputChange} />
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
            {errors.terms && <ErrorMessage text={errors.terms} />}
          </div>
          <button className={styles.submitButton} type="submit" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UncontrolledFormPage;
