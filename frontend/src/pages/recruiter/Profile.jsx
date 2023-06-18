import { useState } from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../redux/recruiter/recruiterSlice';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  companyAddress: Yup.string().required('Company Address is required'),
  companySize: Yup.number().required('Company Size is required'),
  industry: Yup.string().required('Industry is required'),
  about: Yup.string().required('About is required'),
});

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const profileId = useSelector(
    (state) => state.recruiters?.recruiters?.profile?._id
  );
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      const uploadedFile = new File([blob], file.name);
      setProfilePic(uploadedFile);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleEditProfile = () => {
    formik.resetForm();
    setEditing(true);
  };

  const formik = useFormik({
    initialValues: {
      companyName: 'Acme Corporation',
      userName: 'recruiter123',
      email: 'recruiter@acmecorp.com',
      contactNumber: 'fdf',
      companyAddress: 'fd',
      companySize: 'fd',
      industry: 'fd',
      about: 'fd',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setEditing(false);
      const formData = new FormData();
      if (profilePic) {
        formData.append('logo', profilePic);
      }
      for (let key in values) {
        formData.append(key, values[key]);
      }
      dispatch(editProfile({ profileId, payload: formData }));
    },
  });

  const handleResetPassword = () => {
    // Perform reset password logic here
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src={profilePic}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                marginBottom: 2,
                marginLeft: '10rem',
              }}
            />
            {editing && (
              <label htmlFor="upload-profile-pic">
                <input
                  id="upload-profile-pic"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <Button
                  style={{ marginBottom: '2rem' }}
                  variant="contained"
                  component="span"
                >
                  Upload Company Logo
                </Button>
                <Button
                  style={{ marginLeft: '3rem', marginBottom: '2rem' }}
                  variant="contained"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </label>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              fullWidth
              disabled={!editing}
              error={formik.touched.companyName && formik.errors.companyName}
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
              onChange={formik.handleChange}
              value={formik.values.companyName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Username"
              name="userName"
              fullWidth
              disabled={!editing}
              error={formik.touched.userName && formik.errors.userName}
              helperText={formik.touched.userName && formik.errors.userName}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              disabled={!editing}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact Number"
              name="contactNumber"
              fullWidth
              disabled={!editing}
              error={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
              onChange={formik.handleChange}
              value={formik.values.contactNumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Company Address"
              name="companyAddress"
              fullWidth
              disabled={!editing}
              error={
                formik.touched.companyAddress && formik.errors.companyAddress
              }
              helperText={
                formik.touched.companyAddress && formik.errors.companyAddress
              }
              onChange={formik.handleChange}
              value={formik.values.companyAddress}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Company Size"
              name="companySize"
              fullWidth
              disabled={!editing}
              error={formik.touched.companySize && formik.errors.companySize}
              helperText={
                formik.touched.companySize && formik.errors.companySize
              }
              onChange={formik.handleChange}
              value={formik.values.companySize}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Industry"
              name="industry"
              fullWidth
              disabled={!editing}
              error={formik.touched.industry && formik.errors.industry}
              helperText={formik.touched.industry && formik.errors.industry}
              onChange={formik.handleChange}
              value={formik.values.industry}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="About"
              name="about"
              fullWidth
              multiline
              rows={4}
              disabled={!editing}
              error={formik.touched.about && formik.errors.about}
              helperText={formik.touched.about && formik.errors.about}
              onChange={formik.handleChange}
              value={formik.values.about}
            />
          </Grid>
          <Grid item xs={12}>
            {editing ? (
              <Button type="submit" variant="contained">
                Save Profile
              </Button>
            ) : (
              <Button variant="contained" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfilePage;
