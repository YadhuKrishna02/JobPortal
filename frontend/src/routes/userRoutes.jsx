import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserHeader from '../components/Home/Navbar';
import LoginModal from '../components/Modals/LoginModal';
import Footer from '../components/Home/Footer';
import ProfilePage from '../pages/job-seeker/EditProfile';
import ViewProfile from '../pages/job-seeker/Profile';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ChatPage from '../pages/Chat/Chat';
import CallPage from '../pages/Call/Call';
import AppliedJobsList from '../pages/job-seeker/AppliedJobsList';

function UserRoutes() {
  const token = useSelector((state) => state?.users?.users?.token);
  return (
    <>
      <UserHeader /> {/* Include the common user header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={token ? <ViewProfile /> : <Navigate to="../" />}
        />
        <Route
          path="/chat/"
          element={token ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route
          path="/room/:roomId"
          element={token ? <CallPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit_profile"
          element={token ? <ProfilePage /> : <Navigate to="../" />}
        />
        <Route
          path="/applied_jobs"
          element={token ? <AppliedJobsList /> : <Navigate to="../" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;
