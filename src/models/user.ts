import { countryNames } from '@/constants/countries';
import {
  capitalLetterRegExp,
  lowerLetterRegExp,
  numberRegExp,
  specialCharacterRegExp,
} from '@/constants/regexps';
import { object, string, number, InferType, ref, mixed } from 'yup';

export const userSchema = object().shape({
  name: string().when('$name', {
    is: (value: string | undefined) => value === undefined || value.length === 0,
    then: (schema) => schema.required('Enter the name'),
    otherwise: (schema) => schema.matches(/^\p{Lu}/u, 'The name must begin with a capital letter'),
  }),
  age: number()
    .required('Enter the age')
    .positive('Age must be positive')
    .integer('Age must be integer')
    .typeError('Enter the age'),
  email: string().required('Enter the email').email('Incorrect email address'),
  password: string().when('$password', {
    is: (value: string | undefined) => value === undefined || value.length === 0,
    then: (schema) => schema.required('Enter the password'),
    otherwise: (schema) =>
      schema
        .matches(specialCharacterRegExp, 'At least one special character is required')
        .matches(lowerLetterRegExp, 'At least one lowercased letter is required')
        .matches(capitalLetterRegExp, 'At least one uppercased letter is required')
        .matches(numberRegExp, 'At least one number is required'),
  }),
  confirmPassword: string()
    .required('Repeat the password')
    .oneOf([ref('password')], 'Passwords do not match'),
  gender: string().required('Choose your gender').oneOf(['male', 'female']),
  terms: string()
    .required('Accept the Terms and Conditions')
    .oneOf(['on'], 'Accept the Terms and Conditions'),
  profileImage: mixed<FileList>()
    .required('Choose a profile image')
    .test(
      'file size',
      'Image size should be less than 1Mb',
      (value) => value && value[0] && value[0].size <= 1048576,
    )
    .test(
      'file extension',
      'Only png and jpeg images are allowed',
      (value) => value && value[0] && ['image/png', 'image/jpeg'].includes(value[0].type),
    ),
  country: string().required().oneOf(countryNames, 'Choose a country from the list'),
});

export type UserSchema = InferType<typeof userSchema>;
