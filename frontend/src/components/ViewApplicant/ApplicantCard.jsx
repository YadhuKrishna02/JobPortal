import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import VideoCallIcon from '@material-ui/icons/VideoCall';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40rem',
    },
    position: 'relative',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  jobTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  jobTitle: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  location: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },

  buttons: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  editButton: {
    marginRight: theme.spacing(1),
  },
  applicationButton: {
    color: theme.palette.primary.main,
    paddingLeft: '30px',
    paddingRight: '30px',
    marginBottom: '30px',
  },
  personIcon: {
    marginRight: theme.spacing(1),
  },
  phoneNumber: {
    marginTop: '10px',
  },
}));

const ApplicantCard = (props) => {
  const { name, email, phoneNumber, onChatButtonClick } = props;
  const handleChatButtonClick = () => {
    // Call the callback function passed from the parent component
    if (onChatButtonClick) {
      onChatButtonClick();
    }
  };
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Avatar alt="Company Logo" className={classes.logo} />
      <Grid container direction="column" spacing={2}>
        <Grid item className={classes.jobTitleContainer}>
          <Typography variant="h6" className={classes.jobTitle}>
            {name}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="body2" className={classes.email}>
            {email}
          </Typography>
          <Typography variant="body2" className={classes.phoneNumber}>
            {phoneNumber}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          className={classes.editButton}
        >
          View CV
        </Button>
        <Button
          variant="outlined"
          startIcon={<ChatIcon />}
          className={classes.deleteButton}
          onClick={handleChatButtonClick}
        >
          Chat
        </Button>
      </div>
      <Button
        variant="outlined"
        startIcon={<VideoCallIcon />}
        className={classes.applicationButton}
      >
        SCHEDULE
      </Button>
    </Container>
  );
};

ApplicantCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};
ApplicantCard.defaultProps = {
  name: '',
  email: '',
  phoneNumber: '',
};

export default ApplicantCard;
