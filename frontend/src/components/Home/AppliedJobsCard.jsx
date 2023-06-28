import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'timeago.js';

import {
  Container,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { fetchStatus } from '../../redux/user/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff', // Off-white color
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start', // Align items to flex-start
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
  },
  logo: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },

  jobTitle: {
    fontWeight: 'bold',
    color: '#333', // Text color #333
    marginRight: theme.spacing(1),
  },
  location: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  skills: {
    display: 'flex',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  buttons: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  applyButton: {
    // color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  visibilityButton: {
    marginRight: '2rem',
  },
  selectedBackground: {
    backgroundColor: '#80ed99',
  },
  rejectBackground: {
    backgroundColor: '#d00000',
  },
  shortlistBackground: {
    backgroundColor: '#90e0ef',
  },
}));

const JobContainer = ({
  requiredSkills,
  jobTitle,
  jobDescription,
  salaryPackage,
  jobLocation,
  jobId,
  timeAgo,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const applicantId = useSelector((state) => state?.users?.profile?._id);

  const handleVisibilityClick = async () => {
    setOpen(true);

    const result = await dispatch(fetchStatus({ jobId, applicantId }));
    setStatus(result?.payload);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getDialogBackground = () => {
    switch (status) {
      case 'Selected':
        return classes.selectedBackground;
      case 'Rejected':
        return classes.rejectBackground;
      case 'Shortlisted':
        return classes.shortlistBackground;
      default:
        return '';
    }
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Button
          variant="contained"
          className={classes.visibilityButton}
          onClick={handleVisibilityClick}
        >
          View
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          classes={{ paper: getDialogBackground() }}
        >
          <DialogTitle>{status ? status : 'Pending'}</DialogTitle>
          <DialogContent className={classes.popupContent}>
            {/* Add your content for the applied job status here */}
            {/* This can include any relevant information about the job status */}
          </DialogContent>
        </Dialog>
        <Avatar alt="Company Logo" className={classes.logo} />
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.jobTitleContainer}>
            <Typography variant="h6" className={classes.jobTitle}>
              {jobTitle}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="body2"
              className={classes.location}
              style={{ color: '#777585' }}
            >
              <LocationOnIcon style={{ marginRight: '0.5rem' }} />
              {jobLocation}
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              style={{
                color: '#777585',
                display: 'flex',
                alignItems: 'center',
              }}
              variant="body1"
            >
              <DescriptionIcon style={{ marginRight: '0.5rem' }} />
              {jobDescription}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: '#777585',
                display: 'flex',
                alignItems: 'center',
              }}
              variant="body2"
              className={classes.salary}
            >
              <CurrencyRupeeIcon
                className={classes.icon}
                style={{ marginRight: '0.5rem' }}
              />
              {/* <span className={classes.rupeeIcon}>₹</span> */}
              {salaryPackage}
            </Typography>
          </Grid>
          <Grid item className={classes.skills}>
            {requiredSkills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                style={{
                  backgroundColor: '#F4F4F5',
                  height: '1.5rem',
                  color: '#777585',
                }}
                clickable={false}
              />
            ))}
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: '#777585',
                display: 'flex',
                alignItems: 'center',
              }}
              variant="body2"
              className={classes.salary}
            >
              <ScheduleIcon
                className={classes.icon}
                style={{ marginRight: '0.5rem' }}
              />
              <span>{format(timeAgo)}</span>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          startIcon={
            <VisibilityIcon
              // className={classes.visibilityIcon}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          }
          className={classes.visibilityButton}
        ></Button>
      </Container>
    </>
  );
};

JobContainer.propTypes = {
  companyLogo: PropTypes.string.isRequired,
  requiredSkills: PropTypes.array.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  salaryPackage: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  applied: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
  onApplicantsClick: PropTypes.func.isRequired,
};

export default JobContainer;
