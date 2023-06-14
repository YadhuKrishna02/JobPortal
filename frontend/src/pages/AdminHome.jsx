import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAsyncRecruiter } from '../redux/recruiter/recruiterSlice';
import { loginRecruiter } from '../redux/recruiter/recruiterSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // Customize primary color
    },
  },
});

const signupValidationSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  userName: yup.string().required('User Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      companyName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: isSignup ? signupValidationSchema : loginValidationSchema,
    onSubmit: async (values) => {
      if (isSignup) {
        const response = await dispatch(addAsyncRecruiter(values));
        if (response?.payload?.status === 'success') {
          navigate('/recruiter/jobs');
          toast.success('Logged in successful');
        }
        if (response?.payload === 'existing recruiter') {
          toast.error('Recruiter already exists');
        } else if (response?.payload === 'existing email') {
          toast.error('Email already exists');
        }
      } else {
        const response = await dispatch(loginRecruiter(values));
        if (response?.payload === `this user doesn't exist`) {
          toast.error('Invalid credentials');
        } else {
          toast.success('Logged in successful');
        }
      }
    },
  });

  const handleToggleForm = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    formik.resetForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isSignup ? 'Sign Up' : 'Login'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      variant="outlined"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.companyName &&
                        Boolean(formik.errors.companyName)
                      }
                      helperText={
                        formik.touched.companyName && formik.errors.companyName
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="userName"
                      name="userName"
                      label="User Name"
                      variant="outlined"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                      }
                      helperText={
                        formik.touched.userName && formik.errors.userName
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {isSignup && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: '#00b0ff',
                    color: '#fff',
                    borderRadius: '5px',
                    height: '30px',
                  }}
                >
                  {isSignup ? 'Sign Up' : 'Login'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  style={{
                    backgroundColor: '#00b0ff',
                    color: '#fff',
                    borderRadius: '5px',
                    height: '40px',
                  }}
                  onClick={handleToggleForm}
                >
                  {isSignup
                    ? 'Already have an account? Login'
                    : 'New user? Register'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
export default AdminHome;
