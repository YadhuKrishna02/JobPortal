import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import JobContainer from '../../components/Home/AppliedJobsCard';
import { getAppliedJobs } from '../../redux/user/jobSlice';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@material-ui/core';

const JobList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);

  const [applying, setApplying] = useState(false); // Loading state for job application

  const applicantId = useSelector((state) => state?.users?.users?.applicantId);
  const dispatch = useDispatch();

  useEffect(() => {
    const getJobs = async () => {
      try {
        console.log('entereddddddddd');
        const response = await dispatch(getAppliedJobs(applicantId));
        console.log(response, 'qqqqqqqqqqq');
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, [dispatch, applicantId]);
  const jobs = useSelector((state) => state?.appliedJobs?.currentApplied);
  console.log(jobs, 'applyyyyyyyy');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayJobs = jobs?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <Grid item xs={12}>
        <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>
          Applied Jobs
        </Typography>
      </Grid>
      {applying && ( // Show loading indicator while applying is true
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <CircularProgress />
        </div>
      )}
      {displayJobs?.length > 0 ? (
        displayJobs?.map((job) => (
          <JobContainer
            key={job._id}
            jobLocation={job.jobLocation}
            requiredSkills={job.skills}
            jobTitle={job.jobTitle}
            jobDescription={job.essentialKnowledge}
            salaryPackage={job.salary}
            jobId={job._id}
            timeAgo={job.createdAt}
          />
        ))
      ) : (
        <Typography variant="body1">No jobs found.</Typography>
      )}

      <Pagination
        count={Math.ceil(displayJobs?.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginRight: '35rem',
          marginBottom: '10rem',
        }}
      />
    </>
  );
};

export default JobList;
