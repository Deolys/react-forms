import { countryNames } from '@/constants/countries';
import {
  capitalLetterRegExp,
  lowerLetterRegExp,
  numberRegExp,
  specialCharacterRegExp,
} from '@/constants/regexps';
import { object, string, number, InferType, ref, mixed, boolean } from 'yup';

export const userSchema = object().shape({
  name: string()
    .required('Enter the name')
    .matches(/^\p{Lu}/u, 'The name must begin with a capital letter')
    .test('empty name', 'Enter the name', (value) => value !== ''),
  age: number()
    .required('Enter the age')
    .positive('Age must be positive')
    .integer('Age must be integer')
    .typeError('Enter the age'),
  email: string().required('Enter the email').email('Incorrect email address'),
  password: string()
    .required('Enter the password')
    .matches(specialCharacterRegExp, 'At least one special character is required')
    .matches(lowerLetterRegExp, 'At least one lowercased letter is required')
    .matches(capitalLetterRegExp, 'At least one uppercased letter is required')
    .matches(numberRegExp, 'At least one number is required')
    .test('empty password', 'Enter the password', (value) => value !== ''),
  confirmPassword: string()
    .required('Repeat the password')
    .oneOf([ref('password')], 'Passwords do not match'),
  gender: string().required('Choose your gender').oneOf(['male', 'female']),
  terms: boolean()
    .required('Accept the Terms and Conditions')
    .isTrue('Accept the Terms and Conditions'),
  profileImage: mixed((input): input is File => input instanceof File)
    .required('Choose a profile image')
    .transform((value) => {
      if (value instanceof File) {
        return value;
      }
      if (value instanceof FileList) {
        return value.item(0);
      }
    })
    .test(
      'file size',
      'Image size should be less than 1Mb',
      (value) => value && value.size <= 1048576,
    )
    .test(
      'file extension',
      'Only png and jpeg images are allowed',
      (value) => value && ['image/png', 'image/jpeg'].includes(value.type),
    ),
  country: string().required().oneOf(countryNames, 'Choose a country from the list'),
});

export type UserSchema = InferType<typeof userSchema>;
