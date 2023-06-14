import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewProfile = () => {
  const profileData = useSelector((state) => state?.users?.profile);

  const handlePreviewResume = () => {
    window.open(profileData.resume, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">First Name:</Typography>
                <Typography>{profileData.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Last Name:</Typography>
                <Typography>{profileData.lastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography>{profileData.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Contact Number:</Typography>
                <Typography>{profileData.contactNumber}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Education:</Typography>
                <Typography>{profileData.education}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Languages:</Typography>
                <Grid container spacing={1}>
                  {profileData?.languages.map((language, index) => (
                    <Grid item key={index}>
                      <Chip label={language} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Button variant="contained" onClick={handlePreviewResume}>
                  Preview Resume
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  component={Link}
                  to="/edit_profile"
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewProfile;
