import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor: '#2196f3',
    color: '#000',
  },
}));

const SideDrawer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const drawerItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/recruiter/',
    },
    {
      text: 'Create Jobs',
      icon: <CreateIcon />,
      path: '/recruiter/create_job',
    },
    {
      text: 'Profile',
      icon: <AccountCircle />,
      path: '/recruiter/profile',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {drawerItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
