import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';
import JobContainer from './Cards';
import SearchBar from './SearchBar';
import Pagination from '@mui/material/Pagination';
import { ApplyJob, getAllJobs } from '../../redux/user/jobSlice';
import FilterModal from '../../components/Modals/FilterModal';

const JobList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [applying, setApplying] = useState(false); // Loading state for job application

  const applicantId = useSelector((state) => state?.users?.users?.profile?._id);
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state?.appliedJobs?.jobs);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await dispatch(getAllJobs());
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, [dispatch]);

  useEffect(() => {
    const filtered = jobs
      .filter((job) => {
        const { jobLocation, jobTitle, jobType } = job;
        const searchLowercase = searchTerm.toLowerCase();
        return (
          jobLocation.toLowerCase().includes(searchLowercase) ||
          jobTitle.toLowerCase().includes(searchLowercase) ||
          jobType.toLowerCase().includes(searchLowercase)
        );
      })
      .sort((a, b) => b._id.localeCompare(a._id));

    setFilteredJobs(filtered);
    setPage(1);
  }, [jobs, searchTerm]);

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
    }, 500);
    setTimeoutId(newTimeoutId);
  };

  const handleFilter = (filters) => {
    const { salary, location, jobTitle } = filters;

    const filtered = jobs.filter((job) => {
      const jobSalary = job.salary.toLowerCase();
      const jobLocation = job.jobLocation.toLowerCase();
      const jobTitleLowerCase = job.jobTitle.toLowerCase();

      return (
        (salary === '' || jobSalary === salary) &&
        (location === '' || jobLocation.includes(location.toLowerCase())) &&
        (jobTitle === '' || jobTitleLowerCase.includes(jobTitle.toLowerCase()))
      );
    });

    setFilteredJobs(filtered);
    setPage(1);
  };

  const displayJobs = filteredJobs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <SearchBar placeholder="Search Jobs" onSearch={handleSearch} />
      </div>
      <FilterModal onFilter={handleFilter} />
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
            key={job._id}
            jobLocation={job.jobLocation}
            requiredSkills={job.skills}
            jobTitle={job.jobTitle}
            jobDescription={job.essentialKnowledge}
            salaryPackage={job.salary}
            onApplicantsClick={handleApply}
            jobId={job._id}
            timeAgo={job.createdAt}
          />
        ))
      ) : (
        <Typography variant="body1">No jobs found.</Typography>
      )}

      <Pagination
        count={Math.ceil(filteredJobs.length / rowsPerPage)}
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
