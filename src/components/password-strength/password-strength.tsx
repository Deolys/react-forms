import { type JSX } from 'react';
import {
  capitalLetterRegExp,
  lowerLetterRegExp,
  numberRegExp,
  specialCharacterRegExp,
} from '@/constants/regexps';

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps): JSX.Element {
  let strength = 0;
  if (password) {
    if (capitalLetterRegExp.test(password)) {
      strength += 25;
    }
    if (lowerLetterRegExp.test(password)) {
      strength += 25;
    }
    if (numberRegExp.test(`${password}`)) {
      strength += 25;
    }
    if (specialCharacterRegExp.test(password)) {
      strength += 25;
    }
  }

  return (
    <>
      <label htmlFor="password-strength">strength:</label>
      <progress id="password-strength" max="100" value={strength}>
        {strength}%
      </progress>
    </>
  );
}

export default PasswordStrength;
