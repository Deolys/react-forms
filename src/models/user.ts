import { countryNames } from '@/constants/countries';
import { object, string, number, InferType, ref, mixed } from 'yup';

export const userSchema = object().shape({
  name: string()
    .required('Enter the name')
    .matches(/^\p{Lu}/u, 'The name must begin with a capital letter'),
  age: number()
    .required('Enter the age')
    .positive('Age must be positive')
    .integer('Age must be integer')
    .typeError('Age must be a number'),
  email: string().required('Enter the email').email('Incorrect email address'),
  password: string()
    .required('Enter the password')
    .matches(/[!@#$%^&*\-+(),.?:{}|<>]/, 'At least one special character is required')
    .matches(/\p{Ll}/u, 'At least one lowercased letter is required')
    .matches(/\p{Lu}/u, 'At least one uppercased letter is required')
    .matches(/[0-9]/, 'At least one number is required'),
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
