import ApplicantCard from '../../components/ViewApplicant/ApplicantCard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { viewApplicants } from '../../redux/recruiter/recruiterSlice';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const ApplicantsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await dispatch(viewApplicants(jobId));
        setApplicants(response?.payload?.applicantsDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when the dispatch is finished
      }
    };

    fetchApplicants();
  }, [dispatch, jobId]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Applicants List</h1>
      {loading ? (
        // Show loading spinner when loading is true
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        // Render the applicant cards when loading is false
        applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            name={applicant.firstName}
            email={applicant.email}
            phoneNumber={applicant.contactNumber}
          />
        ))
      )}
    </div>
  );
};

export default ApplicantsList;
