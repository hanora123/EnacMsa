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

// Mock data (will be replaced with actual data from backend)
const mockStats = {
  totalCitizens: 24859,
  cardsIssued: 18742,
  pendingCards: 423,
  activeInstitutions: 156,
  recentActivity: [
    { id: 1, action: 'Card issued', citizen: 'Ahmed Mohamed', timestamp: '2023-11-15 14:32' },
    { id: 2, action: 'Profile accessed', citizen: 'Sara Ahmed', timestamp: '2023-11-15 13:45' },
    { id: 3, action: 'Card revoked', citizen: 'Mahmoud Ali', timestamp: '2023-11-15 11:20' },
    { id: 4, action: 'New citizen registered', citizen: 'Fatima Hussein', timestamp: '2023-11-15 10:05' },
  ],
  alerts: [
    { id: 1, type: 'warning', message: '423 cards pending issuance' },
    { id: 2, type: 'error', message: '15 institution licenses expiring this month' },
    { id: 3, type: 'info', message: 'System maintenance scheduled for 20th November' },
  ]
};

const StatCard = ({ icon, title, value, color }) => (
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

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<PeopleOutline />} 
            title="Total Citizens" 
            value={mockStats.totalCitizens} 
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CreditCardOutlined />} 
            title="Cards Issued" 
            value={mockStats.cardsIssued} 
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<CreditCardOutlined />} 
            title="Pending Cards" 
            value={mockStats.pendingCards} 
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<LocalHospitalOutlined />} 
            title="Active Institutions" 
            value={mockStats.activeInstitutions} 
            color="info"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardHeader title="Recent Activity" />
            <Divider />
            <List>
              {mockStats.recentActivity.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemText 
                      primary={activity.action}
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
              <Button variant="text">View All Activity</Button>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardHeader 
              title="Alerts" 
              avatar={<WarningOutlined color="warning" />}
            />
            <Divider />
            <List>
              {mockStats.alerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <ListItem>
                    <ListItemText 
                      primary={alert.message}
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