import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import JobContainer from './Cards';
import SearchBar from './SearchBar';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import { ApplyJob } from '../../redux/user/jobSlice';

const JobList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const [applying, setApplying] = useState(false); // Loading state for job application

  const jobs = useSelector((state) => state.jobs.jobs);
  const applicantId = useSelector((state) => state?.users?.users?.profile?._id);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleApply = async (jobId) => {
    setApplying(true); // Set applying state to true
    const result = await dispatch(ApplyJob({ jobId, payload: applicantId }));
    setApplying(false); // Set applying state to false when the response is received
  };

  const handleSearch = (searchTerm) => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setSearchTerm(searchTerm.toLowerCase());
      setPage(1);
    }, 500);
    setTimeoutId(newTimeoutId);
  };

  const filteredJobs = [...jobs]
    .sort((a, b) => {
      return b.job._id.localeCompare(a.job._id);
    })
    .filter((job) => {
      const { jobLocation, jobTitle, jobType } = job.job;
      const searchLowercase = searchTerm.toLowerCase();
      return (
        jobLocation.toLowerCase().includes(searchLowercase) ||
        jobTitle.toLowerCase().includes(searchLowercase) ||
        jobType.toLowerCase().includes(searchLowercase)
      );
    });

  const displayJobs = filteredJobs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <SearchBar placeholder="Search Jobs" onSearch={handleSearch} />
      </div>
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
      {displayJobs.length > 0 ? (
        displayJobs.map((job) => (
          <JobContainer
            key={job.job._id}
            companyLogo="logo"
            jobLocation={job.job.jobLocation}
            requiredSkills={job.job.skills}
            jobTitle={job.job.jobTitle}
            jobDescription={job.job.essentialKnowledge}
            salaryPackage={job.job.salary}
            onApplicantsClick={handleApply}
            jobId={job.job._id}
          />
        ))
      ) : (
        <Typography variant="body1">No jobs found.</Typography>
      )}

      <Pagination
        count={Math.ceil(jobs.length / rowsPerPage)}
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
