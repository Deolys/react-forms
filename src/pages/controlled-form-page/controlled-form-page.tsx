import { type JSX } from 'react';
import { Header } from '@/components/header';
import styles from '@/styles/form-pages.module.css';
import { ErrorMessage } from '@/components/error-message';
import { PasswordStrength } from '@/components/password-strength';
import { useAppSelector } from '@/store/hooks';
import useControlledForm from '@/hooks/use-controlled-form';
import { blockInvalidChar } from '@/utils/block-invalid-char-number';

export function ControlledFormPage(): JSX.Element {
  const { register, handleSubmit, errors, isDirty, isValid, password, onSubmit } =
    useControlledForm();
  const countriesData = useAppSelector((state) => state.forms.countries);

  return (
    <div className={styles.wrapperControlled}>
      <Header />
      <h1 className={styles.formTitle}>React Hook Form</h1>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? 'true' : 'false'}
              {...register('name')}
            />
            {errors.name && <ErrorMessage text={errors.name.message} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="age">Age:</label>
            <input id="age" type="number" onKeyDown={blockInvalidChar} {...register('age')} />
            {errors.age && <ErrorMessage text={errors.age.message} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" {...register('email')} />
            {errors.email && <ErrorMessage text={errors.email.message} />}
          </div>
          <div className={`${styles.field} ${styles.bigField}`}>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" {...register('password')} />
            <div className={styles.strength}>
              <div className={styles.raw}>
                <PasswordStrength password={password} />
              </div>
            </div>
            {errors.password && <ErrorMessage text={errors.password.message} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <ErrorMessage text={errors.confirmPassword.message} />}
          </div>
          <div className={styles.field}>
            <p>Select gender:</p>
            <div className={styles.raw}>
              <input type="radio" id="male" value="male" {...register('gender')} />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" value="female" {...register('gender')} />
              <label htmlFor="female">Female</label>
            </div>
            {errors.gender && <ErrorMessage text={errors.gender.message} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="profileImage">Profile Image:</label>
            <input type="file" id="profileImage" {...register('profileImage')} />
            {errors.profileImage && <ErrorMessage text={errors.profileImage.message} />}
          </div>
          <div className={styles.field}>
            <label htmlFor="country">Choose a country:</label>
            <input type="text" list="countries" id="country" {...register('country')} />
            <datalist id="countries">
              {countriesData.map((name) => {
                return <option key={name} value={name} />;
              })}
            </datalist>
            {errors.country && <ErrorMessage text={errors.country.message} />}
          </div>
          <div className={`${styles.field} ${styles.smallField}`}>
            <div className={styles.raw}>
              <input id="terms" type="checkbox" {...register('terms')} />
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
            {errors.terms && <ErrorMessage text={errors.terms.message} />}
          </div>
          <button className={styles.submitButton} type="submit" disabled={!isDirty || !isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ControlledFormPage;
