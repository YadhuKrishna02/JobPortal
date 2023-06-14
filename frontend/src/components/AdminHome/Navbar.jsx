import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/recruiter/recruiterSlice';
import { toast } from 'react-toastify';

const pages = ['Jobs', 'Users'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const token = useSelector((state) => state?.recruiters?.recruiters?.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/recruiter');
    toast.success('Logout Successful');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: '#2196f3', color: '#fff' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#fff', // Black text color
              textDecoration: 'none',
            }}
          >
            Job Zen
          </Typography>

          {/* Mobile Nav Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  {page === 'Users' ? (
                    <Typography
                      sx={{ textDecoration: 'none' }}
                      textAlign="center"
                      component={Link}
                      to="/recruiter/users"
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate('/recruiter/users');
                      }}
                    >
                      {page}
                    </Typography>
                  ) : (
                    <Typography textAlign="center">{page}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Nav Menu */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job Zen
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                style={{ color: '#fff' }}
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Users') {
                    navigate('/recruiter/users');
                  } else if (page === 'Jobs') {
                    navigate('/recruiter/jobs');
                  }
                }}
                sx={{
                  my: 2,
                  color: '#fff', // Black text color
                  display: 'block',
                  md: 'flex',
                  textDecoration: 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Login/Logout and Settings */}
          {token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogout}
                sx={{ display: { xs: 'none', md: 'flex' } }}
                style={{ color: '#fff' }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogin}
                component={Link}
                to="/login"
                sx={{ display: { xs: 'none', md: 'flex', color: '#fff' } }}
                color="inherit"
              >
                Login
              </Button>
            </Box>
          )}

          {/* User Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
