import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserHeader from '../components/Home/Navbar';
import LoginModal from '../components/Modals/LoginModal';
import Footer from '../components/Home/Footer';
import ProfilePage from '../pages/job-seeker/EditProfile';
import ViewProfile from '../pages/job-seeker/Profile';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

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
          path="/edit_profile"
          element={token ? <ProfilePage /> : <Navigate to="../" />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;
