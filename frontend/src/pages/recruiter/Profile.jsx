import { useState } from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Perform additional validation if needed
    setProfilePic(URL.createObjectURL(file));
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    setEditing(false);
    // Perform save logic here
  };

  const handleResetPassword = () => {
    // Perform reset password logic here
  };

  return (
    <Container maxWidth="sm">
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
                // sx={{ marginLeft: 2, marginBottom: 5 }}
              >
                Reset Password
              </Button>
            </label>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            defaultValue="Acme Corporation"
            fullWidth
            disabled={!editing}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Username"
            defaultValue="recruiter123"
            fullWidth
            disabled={!editing}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            defaultValue="recruiter@acmecorp.com"
            fullWidth
            disabled={!editing}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Contact Number"
            fullWidth
            disabled={!editing}
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Address"
            fullWidth
            disabled={!editing}
            value={companyAddress}
            onChange={(event) => setCompanyAddress(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Size"
            fullWidth
            disabled={!editing}
            value={companySize}
            onChange={(event) => setCompanySize(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Industry"
            fullWidth
            disabled={!editing}
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Website"
            fullWidth
            disabled={!editing}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="About"
            fullWidth
            multiline
            rows={4}
            disabled={!editing}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {editing ? (
            <Button variant="contained" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
