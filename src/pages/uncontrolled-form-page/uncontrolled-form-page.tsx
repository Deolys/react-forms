import { ChangeEvent, useRef, useState, type FormEvent, type JSX } from 'react';
import { Header } from '@/components/header';
import styles from './uncontrolled-form-page.module.css';
import { userSchema } from '@/models/user';
import { ValidationError } from 'yup';
import { countryNames } from '@/constants/countries';
import { ErrorMessage } from '@/components/error-message';
import { PasswordStrength } from '@/components/password-strength';

type FormErrors = Record<string, string>;

export function UncontrolledFormPage(): JSX.Element {
  const [errors, setErrors] = useState<FormErrors>({});
  const passwordRef = useRef<string | undefined>('');
  const isDisabled = Object.keys(errors).length > 0;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const formData: Record<string, unknown> = Object.fromEntries(form.entries());
    const profileImage = form.get('profileImage');
    passwordRef.current = form.get('password')?.toString();
    if (profileImage instanceof File) {
      const dt = new DataTransfer();
      dt.items.add(profileImage);
      formData.profileImage = dt.files;
    }

    try {
      userSchema.validateSync(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorsData: FormErrors = {};
        error.inner.forEach((item) => {
          if (item.path) {
            errorsData[item.path] = item.message;
          }
        });
        setErrors(errorsData);
      }
    }
  };

  return (
    <>
      <Header />
      <h1 className={styles.formTitle}>Uncontrolled components Form</h1>
      <div className={styles.formWrapper}>
        <form className={styles.uncontrolledForm} onSubmit={handleSubmit} noValidate>
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
            <input id="age" type="number" name="age" onChange={handleInputChange} />
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
              {countryNames.map((name) => {
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
    </>
  );
}

export default UncontrolledFormPage;
