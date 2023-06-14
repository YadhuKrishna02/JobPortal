import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from '../pages/AdminHome';
import AdminHeader from '../components/AdminHome/Navbar';
import JobList from '../pages/recruiter/JobList';
import { Box, useMediaQuery, Hidden } from '@mui/material';
import Drawer from '../components/AdminHome/Drawer';
import JobCreate from '../pages/recruiter/JobCreate';
import JobEdit from '../pages/recruiter/EditJob';
import { useSelector } from 'react-redux';
import ProfilePage from '../pages/recruiter/Profile';
import ApplicantsList from '../pages/recruiter/ApplicantsList';
function AdminRoutes() {
  const token = useSelector((state) => state?.recruiters?.recruiters?.token);
  const isLargeDevice = useMediaQuery('(min-width: 1280px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <Hidden smDown={!isLargeDevice}>
        <Drawer />
      </Hidden>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <AdminHeader /> {/* Include the common admin header */}
        <Box sx={{ flexGrow: 1, padding: '16px' }}>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="jobs" /> : <AdminHome />}
            />{' '}
            {/* Example route */}
            <Route
              path="/jobs"
              element={token ? <JobList /> : <Navigate to="../" />}
            />
            <Route
              path="/create_job"
              element={token ? <JobCreate /> : <Navigate to="../" />}
            />
            <Route
              path="/edit_job/:id"
              element={token ? <JobEdit /> : <Navigate to="../" />}
            />
            <Route
              path="/profile"
              element={token ? <ProfilePage /> : <Navigate to="../" />}
            />
            <Route
              path="/view_applicants/"
              element={token ? <ApplicantsList /> : <Navigate to="../" />}
            />
            {/* Example route */}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminRoutes;
