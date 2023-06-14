import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../common/Firebase';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { addAsyncUser } from '../../redux/user/userSlice';
import { googleAddAsyncUser } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';

RegisterModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function RegisterModal({ handleClose, open }) {
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const buttonStyle = {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const userDetails = await signInWithGoogle();
      const result = await dispatch(googleAddAsyncUser(userDetails));

      // Handle the authentication result here
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during sign-in
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phoneNumber: Yup.string()
        .min(10, 'Enter valid Phone Number')
        .max(10, 'Enter valid Phone Number')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be atleast 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const response = await dispatch(addAsyncUser(values));

      if (response?.payload?.status == 'success') {
        const token = response?.payload?.token;
        handleClose();
        navigate('/');
        toast.success('Login successful');
      }
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <AddCircleOutlineOutlinedIcon />
              </Avatar>
              <h2 style={headerStyle}>Signup</h2>
              <Typography variant="caption">
                Please fill this form to create an account
              </Typography>
            </Grid>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="standard"
                fullWidth
                name="firstName"
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="First Name"
                placeholder="Enter your First Name"
              />
              {formik?.touched?.firstName && formik?.errors?.firstName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.firstName}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="lastName"
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Last Name"
                placeholder="Enter your Second Name"
              />
              {formik?.touched?.lastName && formik?.errors?.lastName ? (
                <Typography variant="caption" color="error">
                  {formik.errors.lastName}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Email"
                placeholder="Enter your Email"
              />
              {formik?.touched?.email && formik?.errors?.email ? (
                <Typography variant="caption" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                name="phoneNumber"
                value={formik?.values?.phoneNumber}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Phone Number"
                placeholder="Enter your Phone Number"
              />
              {formik?.touched?.phoneNumber && formik?.errors?.phoneNumber ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.phoneNumber}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                fullWidth
                type="password"
                name="password"
                value={formik?.values?.password}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Password"
                placeholder="Enter a secure password"
              />
              {formik?.touched?.password && formik?.errors?.password ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.password}
                </Typography>
              ) : null}
              <TextField
                variant="standard"
                type="password"
                fullWidth
                name="confirmPassword"
                value={formik?.values?.confirmPassword}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                label="Confirm Password"
                placeholder="Please confirm the password"
              />
              {formik?.touched?.confirmPassword &&
              formik?.errors?.confirmPassword ? (
                <Typography variant="caption" color="error">
                  {formik?.errors?.confirmPassword}
                </Typography>
              ) : null}

              <Button
                sx={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid}
              >
                Sign Up
              </Button>
            </form>
            <Button
              sx={{
                color: '#ff5c01',
                marginTop: 2,
                border: '1px solid #ff5c01',
              }}
              type="submit"
              variant="outlined"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </Button>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
}
