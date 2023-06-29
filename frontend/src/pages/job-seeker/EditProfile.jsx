import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Chip,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  // IconButton,
  // Avatar,
} from '@mui/material';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../../redux/chat/chatSlice';
import { useDispatch } from 'react-redux';
import { editUserProfile } from '../../redux/user/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { toast } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    education: Yup.string().required('Education is required'),
  });

  const profileId = useSelector((state) => state?.users?.users?.applicantId);
  const [profileData, setProfileData] = useState(null);
  // const [profilePicture, setProfilePicture] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const profile = await dispatch(getUsers(profileId));
        setProfileData(profile?.payload?.data?.userProfile?.profileId);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [profileId, dispatch]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFieldValue('resume', acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]);
  };
  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePicture(file);
  // };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const navigate = useNavigate();

  const [newLanguage, setNewLanguage] = useState('');
  const [languages, setLanguages] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddLanguage = () => {
    if (newLanguage !== '') {
      const updatedLanguages = [...values.languages, newLanguage];
      setFieldValue('languages', updatedLanguages); // Update the formik state
      setLanguages(updatedLanguages); // Update the local state
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (language) => {
    const updatedLanguages = values.languages.filter(
      (item) => item !== language
    );
    setFieldValue('languages', updatedLanguages); // Update the formik state
    setLanguages(updatedLanguages); // Update the local state
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      education: '',
      languages: [],
      resume: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();

        if (values.resume) {
          // If a new resume file has been selected, append it to the form data
          formData.append('resume', values.resume);
        }
        // if (profilePicture) {
        //   formData.append('profilePicture', profilePicture);
        // }
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('contactNumber', values.contactNumber);
        formData.append('education', values.education);
        formData.append('languages', values.languages);

        const result = await dispatch(
          editUserProfile({ payload: formData, profileId })
        );
        console.log('hiii');
        if (result?.payload?.status === 'success') {
          navigate('/profile');
          toast.success('Profile edited');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error, show an error message, or perform any other necessary actions
      } finally {
        setLoading(false);
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    if (profileData) {
      setFieldValue('firstName', profileData.firstName || '');
      setFieldValue('lastName', profileData.lastName || '');
      setFieldValue('email', profileData.email || '');
      setFieldValue('contactNumber', profileData.contactNumber || '');
      setFieldValue('education', profileData.education || '');
      setFieldValue('languages', profileData.languages || []);
    }
  }, [profileData, setFieldValue]);

  if (!profileData) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ marginTop: '10rem' }}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <List
              sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/profile"
                  startIcon={<AccountCircleIcon />}
                >
                  <ListItemText primary="My Profile" />
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button
                  component={Link}
                  to="/applied_jobs"
                  startIcon={<AssignmentIcon />}
                >
                  <ListItemText primary="Applied Jobs" />
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button startIcon={<LockIcon />}>
                  <ListItemText primary="Reset Password" />
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button startIcon={<ExitToAppIcon />}>
                  <ListItemText primary="Logout" />
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9} sx={{ marginTop: '6rem' }}>
          <Typography variant="h4" gutterBottom>
            Edit Profile
          </Typography>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Profile Picture:
                  </Typography>
                  <input
                    accept="image/*"
                    id="profile-picture-input"
                    type="file"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="profile-picture-input">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <Avatar
                        src={profilePicture}
                        sx={{ width: 100, height: 100 }}
                      />
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contact Number"
                    name="contactNumber"
                    fullWidth
                    variant="outlined"
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.contactNumber && Boolean(errors.contactNumber)
                    }
                    helperText={touched.contactNumber && errors.contactNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Education"
                    name="education"
                    fullWidth
                    variant="outlined"
                    value={values.education}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.education && Boolean(errors.education)}
                    helperText={touched.education && errors.education}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Languages:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      label="Add Language"
                      name="newLanguage"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      onClick={handleAddLanguage}
                      sx={{ marginLeft: '10px' }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ marginTop: '10px' }}>
                    {values.languages.map((language, index) => (
                      <Chip
                        key={index}
                        label={language}
                        onDelete={() => handleRemoveLanguage(language)}
                        sx={{ marginRight: '5px', marginBottom: '5px' }}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag and drop your resume here or click to browse</p>
                  </div>
                  {selectedFile && <Typography>{selectedFile.name}</Typography>}
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
