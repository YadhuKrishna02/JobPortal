import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/chat/chatSlice';

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileId = useSelector((state) => state?.users?.users?.applicantId);
  const [profileData, setProfileData] = useState(null);
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
  console.log(profileData, 'proffffffffff');
  const handlePreviewResume = () => {
    window.open(profileData.resume, '_blank');
  };
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            onClick={() => navigate('/applied_jobs')}
          >
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
