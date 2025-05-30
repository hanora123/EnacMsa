import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { 
  PeopleOutline, 
  CreditCardOutlined, 
  LocalHospitalOutlined, 
  WarningOutlined 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

// Mock data (will be replaced with actual data from backend)
const mockStats = {
  totalCitizens: 24859,
  cardsIssued: 18742,
  pendingCards: 423,
  activeInstitutions: 156,
  recentActivity: [
    { id: 1, action: 'cardIssued', citizen: 'Ahmed Mohamed', timestamp: '2023-11-15 14:32' },
    { id: 2, action: 'profileAccessed', citizen: 'Sara Ahmed', timestamp: '2023-11-15 13:45' },
    { id: 3, action: 'cardRevoked', citizen: 'Mahmoud Ali', timestamp: '2023-11-15 11:20' },
    { id: 4, action: 'newCitizen', citizen: 'Fatima Hussein', timestamp: '2023-11-15 10:05' },
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'pendingCards', count: 423 },
    { id: 2, type: 'error', message: 'expiringLicenses', count: 15 },
    { id: 3, type: 'info', message: 'maintenance', date: '20th November' },
  ]
};

const StatCard = ({ icon, title, value, color }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            bgcolor: `${color}.light`, 
            color: `${color}.main`, 
            p: 1.5, 
            borderRadius: 2,
            mr: 2
          }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" component="div">
              {value.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  // Add translation hook
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<PeopleOutline />} 
            title={t('dashboard.stats.totalCitizens')} 
            value={mockStats.totalCitizens} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CreditCardOutlined />} 
            title={t('dashboard.stats.cardsIssued')} 
            value={mockStats.cardsIssued} 
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CreditCardOutlined />} 
            title={t('dashboard.stats.pendingCards')} 
            value={mockStats.pendingCards} 
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<LocalHospitalOutlined />} 
            title={t('dashboard.stats.activeInstitutions')} 
            value={mockStats.activeInstitutions} 
            color="info"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardHeader title={t('dashboard.recentActivity.title')} />
            <Divider />
            <List>
              {mockStats.recentActivity.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemText 
                      primary={t(`dashboard.recentActivity.actions.${activity.action}`)}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {activity.citizen}
                          </Typography>
                          {` — ${activity.timestamp}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="text">{t('dashboard.recentActivity.viewAll')}</Button>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardHeader 
              title={t('dashboard.alerts.title')} 
              avatar={<WarningOutlined color="warning" />}
            />
            <Divider />
            <List>
              {mockStats.alerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <ListItem>
                    <ListItemText 
                      primary={
                        alert.message === 'maintenance' 
                          ? t(`dashboard.alerts.messages.${alert.message}`, { date: alert.date })
                          : t(`dashboard.alerts.messages.${alert.message}`, { count: alert.count })
                      }
                      primaryTypographyProps={{ color: `${alert.type}.main` }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;