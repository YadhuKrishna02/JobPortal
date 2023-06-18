import ApplicantCard from '../../components/ViewApplicant/ApplicantCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewApplicants } from '../../redux/recruiter/recruiterSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { createChat } from '../../redux/chat/chatSlice';

const ApplicantsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const senderId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiterData?._id
  );

  const handleChatButtonClick = (receiverId) => {
    // Dispatch your Redux action here
    const formData = {
      senderId: senderId,
      receiverId: receiverId,
    };
    // formData.append('senderId', senderId);
    // formData.append('receiverId', receiverId);
    // console.log(senderId, receiverId, 'llllllllll');
    console.log('clickedddddddddddddddddddddddddddddddddddddd');
    const result = dispatch(createChat(formData));
    if (result) {
      navigate('/recruiter/chat');
    }
  };
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
            onChatButtonClick={() => handleChatButtonClick(applicant._id)}
          />
        ))
      )}
    </div>
  );
};

export default ApplicantsList;
