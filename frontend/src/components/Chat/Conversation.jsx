/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecruiter } from '../../redux/chat/chatSlice';
import { getUsers } from '../../redux/chat/chatSlice';
// import { setChatUsers } from '../../state/slice';
// import UserImage from '../UserImage/UserImage';

const Conversation = ({ data, currentUserId, online }) => {
  console.log(currentUserId, 'yadddddddd');
  const chatAuthId = currentUserId.recId
    ? currentUserId.recId
    : currentUserId.appId;
  const [userData, setUserData] = useState(null);
  const [recruiterData, setRecruiterData] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.recruiters?.recruiters?.token);
  useEffect(() => {
    const userId = data?.members.find((id) => id !== chatAuthId);
    console.log(userId, 'uuuuuuuuuuuuu');
    const userIdIndex = data?.members.indexOf(userId);
    const getUserData = async () => {
      try {
        if (userIdIndex == 0) {
          const data = await dispatch(getRecruiter(userId));
          console.log(data, 'dddddddddddd');
          setRecruiterData(data?.payload?.data?.recDetails);
        } else {
          const data = await dispatch(getUsers(userId));
          console.log(data, 'eeeeeeeeee');
          setUserData(data?.payload?.data?.userProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(userData, 'podaaaaa');

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <UserImage image={userData?.displayPicture} size="55px" /> */}
            <Box>
              <Typography variant="h5" fontWeight="500">
                {recruiterData ? recruiterData?.userName : userData?.firstName}
              </Typography>
              <Typography fontSize="0.75rem">
                {online ? 'Online' : 'Offline'}
              </Typography>
            </Box>
            <Box></Box>
          </div>
          {/* <img
            src={userData?.displayPicture ? `http://localhost:5000/uploads/${userData.displayPicture}` : "/assets/150-1503945_transparent-user-png-default-user-image-png-png (1).png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          /> */}
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  );
};

export default Conversation;
