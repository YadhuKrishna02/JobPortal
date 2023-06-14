import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';

import FindJobsImage from '../../images/landing1.jpg';
import PostJobsImage from '../../images/pexels-edmond-dantès-4344860.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    animation: '$slide-in 1s ease-out',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  cardContent: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  buttonContainer: {
    textAlign: 'center', // Center align the buttons
    marginTop: theme.spacing(2),
  },
  button: {
    margin: '0 auto', // Center align the button horizontally
  },
  media: {
    height: 200,
    width: '100%',
    objectFit: 'cover',
  },
  '@keyframes slide-in': {
    '0%': {
      transform: 'translateX(-100%)', // Start from outside the viewport on the left
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(0)', // Stop at the current location
      opacity: 1,
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.header}>
        Welcome to Job Zen
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={FindJobsImage}
              title="Find Jobs"
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.cardTitle}
              >
                Find Jobs
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.cardContent}
              >
                Search and apply for job opportunities in various industries.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={PostJobsImage}
              title="Post Jobs"
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.cardTitle}
              >
                Post Jobs
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.cardContent}
              >
                Recruit the best talent for your organization by posting job
                openings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
