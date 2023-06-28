import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  Avatar,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { useDispatch } from 'react-redux';
import { changeApplicantsStatus } from '../../redux/recruiter/recruiterSlice';
import { useState } from 'react';

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
    height: '15rem', // Increased height
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
  status: {
    marginBottom: theme.spacing(1),
    marginRight: '2rem',
  },
  changeStatus: {
    marginTop: '2rem',
  },
  interviewButton: {
    marginTop: '2rem',
  },
}));

const ApplicantCard = (props) => {
  const {
    name,
    email,
    phoneNumber,
    onChatButtonClick,
    onCVClick,
    onVideoButtonClick,
    onInviteClick,
    applicantId,
    jobId,
  } = props;

  const dispatch = useDispatch();
  const handleChatButtonClick = () => {
    if (onChatButtonClick) {
      onChatButtonClick();
    }
  };

  const [applicationStatus, setApplicationStatus] = useState('');

  const handleStatusChange = (event) => {
    setApplicationStatus(event.target.value);
  };

  const handleStatusSubmit = async () => {
    console.log(applicationStatus, 'aplliiiiii');
    const response = await dispatch(
      changeApplicantsStatus({ applicantId, jobId, applicationStatus })
    );
    console.log(response, 'rrrrrrrrr');
  };

  const handleInterviewMail = () => {
    console.log('Sending interview mail...');
  };

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.status}>
        <InputLabel id="application-status-label">
          Application Status
        </InputLabel>
        <Select
          labelId="application-status-label"
          value={applicationStatus}
          onChange={handleStatusChange}
        >
          <MenuItem value="">Select Status</MenuItem>
          <MenuItem value="Shortlisted">Shortlisted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Selected">Selected</MenuItem>
        </Select>
        <Button
          variant="outlined"
          className={classes.changeStatus}
          onClick={handleStatusSubmit}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          className={classes.interviewButton}
          onClick={onInviteClick}
        >
          INVITE
        </Button>
      </div>
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
          onClick={onCVClick}
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
        onClick={onVideoButtonClick}
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
  onChatButtonClick: PropTypes.func,
  onCVClick: PropTypes.func,
  onVideoButtonClick: PropTypes.func,
  onInviteClick: PropTypes.func,
  onChangeStatusClick: PropTypes.func,
  applicantId: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
};

ApplicantCard.defaultProps = {
  name: '',
  email: '',
  phoneNumber: '',
};

export default ApplicantCard;
