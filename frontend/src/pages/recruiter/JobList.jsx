import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import JobContainer from '../../components/AdminJob/JobCard';
import { getJobById } from '../../redux/recruiter/jobSlice';
import slugify from 'slugify';

const JobPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiterData?._id
  );

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [loading, setLoading] = useState(true); // Loading state for fetching jobs

  useEffect(() => {
    // Simulating an asynchronous fetch request
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const getJobs = () => {
      dispatch(getJobById(recruiterId))
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    };
    getJobs();
  }, []);

  const jobs = useSelector((state) => state?.jobs?.jobsById);
  console.log(jobs, 'lolololo');
  const displayJobs = Array.isArray(jobs)
    ? jobs.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    : [];

  console.log(displayJobs, 'disssssss');
  const handleEditClick = (jobId, jobTitle) => {
    const slug = slugify(jobTitle, { lower: true });
    navigate(`/recruiter/edit_job/${slug}`);
  };

  const handleApplicantsClick = (jobId) => {
    navigate(`/recruiter/view_applicants?jobId=${jobId}`);
  };

  return (
    <>
      <div>
        <Typography
          variant="h4"
          component="h1"
          style={{
            marginBottom: '24px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Jobs
        </Typography>
        {loading ? ( // Show loading indicator while fetching jobs
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <CircularProgress />
          </div>
        ) : displayJobs?.length > 0 ? (
          displayJobs?.map((job) => (
            <JobContainer
              companyLogo="logo"
              key={job?._id}
              jobLocation={job?.jobLocation}
              requiredSkills={job?.skills}
              jobTitle={job?.jobTitle}
              jobDescription={job?.essentialKnowledge}
              salaryPackage={job?.salary}
              onEditClick={() => handleEditClick(job?._id, job?.jobTitle)}
              onApplicantsClick={() => handleApplicantsClick(job?._id)}
            />
          ))
        ) : (
          // No jobs available
          <Typography
            variant="body1"
            style={{ textAlign: 'center', marginTop: '1rem' }}
          >
            No jobs available.
          </Typography>
        )}
      </div>
      <Pagination
        count={Math.ceil(jobs?.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', marginRight: '35rem' }}
      />
    </>
  );
};

export default JobPage;
