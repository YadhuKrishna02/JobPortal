import ApplicantCard from '../../components/ViewApplicant/ApplicantCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewApplicants } from '../../redux/recruiter/recruiterSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { createChat } from '../../redux/chat/chatSlice';
import { sentMail } from '../../redux/recruiter/recruiterSlice';

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

    const result = dispatch(createChat(formData));
    if (result) {
      navigate('/recruiter/chat');
    }
  };

  //video call
  const handleVideoCall = async (roomId) => {
    console.log(roomId, 'rooooom');
    const roomUrl = `http://localhost:5173/room/${roomId}`;
    const message = `Join this room to video chat: ${roomUrl}`;
    const event = {
      preventDefault: () => {},
      message: message,
    };
    // await handleSend(event);
    navigate(`/recruiter/room/${roomId}`);
    console.log('Video call initiated');
  };

  const handleCVClick = (resume) => {
    window.open(resume, '_blank');
  };

  const handleInviteClick = (applicantId, email, firstName) => {
    const response = dispatch(sentMail({ applicantId, email, firstName }));
    console.log(response, 'yuuuu');
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
            onCVClick={() => handleCVClick(applicant.resume)}
            onChatButtonClick={() => handleChatButtonClick(applicant._id)}
            onVideoButtonClick={() => handleVideoCall(applicant._id)}
            onInviteClick={() =>
              handleInviteClick(
                applicant._id,
                applicant.email,
                applicant.firstName
              )
            }
            applicantId={applicant._id}
            jobId={jobId}
          />
        ))
      )}
    </div>
  );
};

export default ApplicantsList;
