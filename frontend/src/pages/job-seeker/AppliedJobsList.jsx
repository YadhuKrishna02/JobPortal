import { useState, useEffect } from 'react';
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
  console.log(applicantId, 'appliIddddddddddddd');
  const dispatch = useDispatch();

  useEffect(() => {
    let didCancel = false;
    const getJobs = async () => {
      try {
        console.log('entereddd');
        setApplying(true); // Set applying state to true
        if (!didCancel) {
          const response = await dispatch(getAppliedJobs(applicantId));
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setApplying(false); // Set applying state back to false
      }
    };

    getJobs();
    return () => {
      didCancel = true;
    };
  }, [applicantId]);

  const jobs = useSelector((state) => state?.appliedJobs?.currentApplied);
  console.log(jobs, 'applyyyyyyyy');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayJobs =
    jobs && jobs?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
        displayJobs &&
        displayJobs?.map((job) => (
          <JobContainer
            key={job?._id}
            jobLocation={job?.jobLocation}
            requiredSkills={job?.skills}
            jobTitle={job?.jobTitle}
            jobDescription={job?.essentialKnowledge}
            salaryPackage={job?.salary}
            jobId={job?._id}
            timeAgo={job?.createdAt}
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
