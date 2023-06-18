import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import { DeleteJob } from '../../redux/recruiter/jobSlice';
import JobContainer from '../../components/AdminJob/JobCard';
import slugify from 'slugify';

const JobPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiterData?._id
  );
  console.log(recruiterId, 'iddd');
  const jobs = useSelector((state) =>
    state?.jobs?.jobs.filter((job) => job?.job?.recruiterId === recruiterId)
  );
  console.log(jobs, 'jjjjjjjj');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
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

  const displayJobs = jobs.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (jobId, jobTitle) => {
    const slug = slugify(jobTitle, { lower: true });
    navigate(`/recruiter/edit_job/${slug}`);
  };

  const handleApplicantsClick = (jobId) => {
    navigate(`/recruiter/view_applicants?jobId=${jobId}`);
  };

  const handleDeleteClick = async (jobId) => {
    setSelectedJobId(jobId);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(DeleteJob(selectedJobId));
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
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
        ) : (
          displayJobs.map((job) => (
            <JobContainer
              companyLogo="logo"
              key={job?.job?._id}
              jobLocation={job?.job?.jobLocation}
              requiredSkills={job?.job?.skills}
              jobTitle={job?.job?.jobTitle}
              jobDescription={job?.job?.essentialKnowledge}
              salaryPackage={job?.job?.salary}
              onEditClick={() =>
                handleEditClick(job?.job?._id, job?.job?.jobTitle)
              }
              onDeleteClick={() => handleDeleteClick(job?.job?._id)}
              onApplicantsClick={() => handleApplicantsClick(job?.job?._id)}
            />
          ))
        )}

        <Dialog open={dialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this job?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Pagination
        count={Math.ceil(jobs.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', marginRight: '35rem' }}
      />
    </>
  );
};

export default JobPage;
