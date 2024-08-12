import { ChangeEvent, useState, type FormEvent, type JSX } from 'react';
import { Header } from '@/components/header';
import styles from './uncontrolled-form-page.module.css';
import { userSchema } from '@/models/user';
import { ValidationError } from 'yup';
import { countryNames } from '@/constants/countries';

type FormErrors = Record<string, string>;

export function UncontrolledFormPage(): JSX.Element {
  const [errors, setErrors] = useState<FormErrors>({});
  const isDisabled = Object.keys(errors).length > 0;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors as FormErrors;
      });
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const formData: Record<string, unknown> = Object.fromEntries(form.entries());
    const profileImage = form.get('profileImage');
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
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            onChange={handleInputChange}
          />
          <label htmlFor="age">Age:</label>
          <input id="age" type="number" name="age" onChange={handleInputChange} />
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" onChange={handleInputChange} />
          <div>
            <label htmlFor="password">Password:</label>
            <label htmlFor="password-strength">strength:</label>
            <progress id="password-strength" max="100" value="70">
              70%
            </progress>
          </div>
          <input id="password" type="password" name="password" onChange={handleInputChange} />
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
          <p>Select gender:</p>
          <div className={styles.field}>
            <input type="radio" id="male" name="gender" value="male" onChange={handleInputChange} />
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
          <div className={styles.field}>
            <input id="terms" name="terms" type="checkbox" onChange={handleInputChange} />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>
          <label htmlFor="profileImage">Profile Image:</label>
          <input type="file" id="profileImage" name="profileImage" onChange={handleInputChange} />
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
          <button className={styles.submitButton} type="submit" disabled={isDisabled}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UncontrolledFormPage;
