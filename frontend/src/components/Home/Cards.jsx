import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F8F8', // Off-white color
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start', // Align items to flex-start
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    width: '100%',
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
  chip: {
    backgroundColor: theme.palette.primary.main, // Set primary blue color
    color: theme.palette.primary.contrastText,
  },
  salary: {
    color: theme.palette.success.main,
  },
  buttons: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  applyButton: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  visibilityButton: {
    color: theme.palette.primary.main,
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  visibilityIcon: {
    marginRight: theme.spacing(1),
  },
}));

const JobContainer = ({
  companyLogo,
  requiredSkills,
  jobTitle,
  jobDescription,
  salaryPackage,
  jobLocation,
  onApplicantsClick,
  jobId,
}) => {
  const classes = useStyles();
  const handleApplyClick = () => {
    onApplicantsClick(jobId); // Invoke the function with the jobId
  };

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Avatar alt="Company Logo" src={companyLogo} className={classes.logo} />
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.jobTitleContainer}>
            <Typography variant="h6" className={classes.jobTitle}>
              {jobTitle}
            </Typography>
            <Typography variant="body2" className={classes.location}>
              {jobLocation}
            </Typography>
          </Grid>
          <Grid item className={classes.jobTitleContainer}>
            <Typography variant="h6" className={classes.jobTitle}>
              {companyLogo}
            </Typography>
          </Grid>
          <Grid item className={classes.skills}>
            {requiredSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                className={classes.chip}
                clickable={false}
              />
            ))}
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {jobDescription}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" className={classes.salary}>
              <span className={classes.rupeeIcon}>₹</span>
              {salaryPackage}
            </Typography>
          </Grid>
        </Grid>

        <div className={classes.buttons}>
          <Button
            variant="outlined"
            startIcon={<SendIcon />}
            className={classes.applyButton}
            onClick={handleApplyClick}
          >
            Apply Now
          </Button>
        </div>
        <Button
          variant="contained"
          startIcon={<VisibilityIcon className={classes.visibilityIcon} />}
          className={classes.visibilityButton}
        >
          View Details
        </Button>
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
  onApplicantsClick: PropTypes.func.isRequired,
};

export default JobContainer;
