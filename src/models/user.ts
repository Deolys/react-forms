import { countryNames } from '@/constants/countries';
import {
  capitalLetterRegExp,
  lowerLetterRegExp,
  numberRegExp,
  specialCharacterRegExp,
} from '@/constants/regexps';
import { object, string, number, InferType, ref, mixed } from 'yup';

export const userSchema = object().shape({
  name: string()
    .matches(/^\p{Lu}/u, 'The name must begin with a capital letter')
    .required('Enter the name'),
  age: number()
    .required('Enter the age')
    .positive('Age must be positive')
    .integer('Age must be integer')
    .typeError('Enter the age'),
  email: string().required('Enter the email').email('Incorrect email address'),
  password: string()
    .matches(specialCharacterRegExp, 'At least one special character is required')
    .matches(lowerLetterRegExp, 'At least one lowercased letter is required')
    .matches(capitalLetterRegExp, 'At least one uppercased letter is required')
    .matches(numberRegExp, 'At least one number is required')
    .required('Enter the password'),
  confirmPassword: string()
    .required('Repeat the password')
    .oneOf([ref('password')], 'Passwords do not match'),
  gender: string().required('Choose your gender').oneOf(['male', 'female']),
  terms: string()
    .required('Accept the Terms and Conditions')
    .oneOf(['on'], 'Accept the Terms and Conditions'),
  profileImage: mixed<File>()
    .required('Choose a profile image')
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
