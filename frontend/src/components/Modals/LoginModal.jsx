// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GoogleIcon from '@mui/icons-material/Google';
import { loginUser } from '../../redux/user/userSlice';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../common/Firebase';
import { toast } from 'react-toastify';
import { googleAddAsyncUser } from '../../redux/user/userSlice';

LoginModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
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
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};

export default function LoginModal({ handleClose, open, handleSignUp }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const userDetails = await signInWithGoogle();
      const result = await dispatch(googleAddAsyncUser(userDetails));
      if (result) {
        toast.success('Login successful');
      }
      handleClose();

      // Handle the authentication result here
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during sign-in
    }
  };
  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 300,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const buttonStyle = { margin: '20px 0' };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'Must be atleast 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(loginUser(values));
      if (response.payload) {
        handleClose();
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
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="standard"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Email"
                placeholder="Please enter your email"
                fullWidth
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography variant="caption" color="error">
                  {formik.errors.email}
                </Typography>
              ) : null}
              <TextField
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="standard"
                placeholder="Please enter your password"
                type="password"
                fullWidth
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography variant="caption" color="error">
                  {formik.errors.password}
                </Typography>
              ) : null}
              <Button
                style={buttonStyle}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!formik.isValid}
              >
                Sign In
              </Button>
              <Button
                sx={{
                  color: '#ff5c01',
                  marginBottom: 1,
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
            </form>
            <Typography>
              <Link sx={{ textDecoration: 'none' }} href="#">
                Forgot Password ?
              </Link>
            </Typography>
            <Typography>
              Do you have an account ?
              <Link
                sx={{
                  marginLeft: 0.5,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Modal>
    </div>
  );
}
