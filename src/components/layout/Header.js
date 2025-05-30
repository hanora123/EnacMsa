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
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Header = ({ onLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  
  // Add translation hook
  const { t, i18n } = useTranslation();
  
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

  // Add this function to handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    handleCloseMenus();
    // Set document direction based on language
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  const menuItems = [
    { text: t('navigation.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('navigation.citizenProfiles'), icon: <PeopleIcon />, path: '/citizens' },
    { text: t('navigation.cardManagement'), icon: <CreditCardIcon />, path: '/cards' },
    { text: t('navigation.institutions'), icon: <LocalHospitalIcon />, path: '/institutions' },
    { text: t('navigation.reports'), icon: <AssessmentIcon />, path: '/reports' },
    { text: t('navigation.support'), icon: <HelpIcon />, path: '/support' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {t('appName')}
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
            {t('appName')}
          </Typography>
          
          <IconButton color="inherit" onClick={handleLanguageMenu}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={handleCloseMenus}
          >
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem>
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
            <MenuItem onClick={handleCloseMenus}>{t('user.profile')}</MenuItem>
            <MenuItem onClick={handleCloseMenus}>{t('user.settings')}</MenuItem>
            <MenuItem onClick={handleLogout}>{t('user.logout')}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        anchor={i18n.language === 'ar' ? 'right' : 'left'}
        sx={{
          '& .MuiDrawer-paper': {
            marginTop: '64px', // This ensures the drawer appears below the AppBar
            height: 'calc(100% - 64px)',
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;