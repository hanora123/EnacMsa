import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box, 
  Avatar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  
  // Mock user data (will be replaced with actual auth)
  const user = {
    name: 'Admin User',
    role: 'Admin',
    avatar: null
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageMenu = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleUserMenu = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setLanguageMenu(null);
    setUserMenu(null);
  };

  // Add this function to handle logout
  const handleLogout = () => {
    handleCloseMenus(); // Close the menu first
    if (onLogout) {
      onLogout(); // Call the onLogout function passed from App.js
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Citizen Profiles', icon: <PeopleIcon />, path: '/citizens' },
    { text: 'Card Management', icon: <CreditCardIcon />, path: '/cards' },
    { text: 'Institutions', icon: <LocalHospitalIcon />, path: '/institutions' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Support', icon: <HelpIcon />, path: '/support' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          NFC ID System
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NFC Insurance ID System
          </Typography>
          
          <IconButton color="inherit" onClick={handleLanguageMenu}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleCloseMenus}
          >
            <MenuItem onClick={handleCloseMenus}>English</MenuItem>
            <MenuItem onClick={handleCloseMenus}>العربية</MenuItem>
          </Menu>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleUserMenu}>
              {user.avatar ? 
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 32, height: 32 }} /> : 
                <AccountCircleIcon />
              }
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              {user.name}
            </Typography>
          </Box>
          
          <Menu
            anchorEl={userMenu}
            open={Boolean(userMenu)}
            onClose={handleCloseMenus}
          >
            <MenuItem onClick={handleCloseMenus}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;