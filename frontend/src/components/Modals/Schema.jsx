import * as Yup from 'yup';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string()
    .max(10, 'Enter valid Phone Number')
    .required('Required'),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger Password' })
    .required('Required '),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  selectRole: Yup.string().test(
    'required',
    'Required',
    (value) => value !== 'select-role'
  ),
});
