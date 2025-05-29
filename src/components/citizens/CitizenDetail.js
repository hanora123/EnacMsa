import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  CreditCard as CreditCardIcon,
  ArrowBack,
  Person,
  LocalHospital,
  History
} from '@mui/icons-material';

// Mock citizen data (will be replaced with API calls)
const mockCitizens = [
  {
    id: 1,
    nationalId: '29012345678901',
    name: 'Ahmed Mohamed',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: 'Cairo, Egypt',
    phone: '+20 123 456 7890',
    email: 'ahmed.mohamed@example.com',
    cardStatus: 'Active',
    insuranceType: 'Comprehensive',
    emergencyContact: 'Mona Mohamed',
    emergencyPhone: '+20 123 456 7899',
    bloodType: 'A+',
    allergies: 'None',
    chronicConditions: 'Diabetes',
    lastUpdated: '2023-10-12',
    cardHistory: [
      { date: '2023-01-15', action: 'Card Issued', details: 'Initial card issuance' },
      { date: '2023-05-20', action: 'Card Used', details: 'Emergency room visit at Cairo Hospital' },
      { date: '2023-08-10', action: 'Card Used', details: 'Prescription refill at Central Pharmacy' },
    ]
  },
  // ... other citizens
];

const CitizenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Find citizen by ID
  const citizen = mockCitizens.find(c => c.id === parseInt(id));

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle edit button click
  const handleEdit = () => {
    navigate(`/citizens/${id}/edit`);
  };

  // Handle delete dialog
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Simulate delete API call
    console.log('Deleting citizen:', id);
    setDeleteDialogOpen(false);
    setActionSuccess('Profile deleted successfully');
    
    // Redirect after successful deletion
    setTimeout(() => {
      navigate('/citizens');
    }, 1500);
  };

  // Handle print profile
  const handlePrintProfile = () => {
    console.log('Printing profile for citizen:', id);
    setActionSuccess('Profile sent to printer');
  };

  // Handle issue new card
  const handleIssueCard = () => {
    console.log('Issuing new card for citizen:', id);
    setActionSuccess('New card issuance initiated');
  };

  // Get status color based on card status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Expired':
        return 'error';
      default:
        return 'default';
    }
  };

  // If citizen not found
  if (!citizen) {
    return (
      <Box>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          Citizen not found
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/citizens')}
          startIcon={<ArrowBack />}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {actionSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionSuccess}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/citizens')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1">
            Citizen Profile
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrintProfile}
            sx={{ mr: 1 }}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
              >
                {citizen.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" gutterBottom>
                {citizen.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                National ID: {citizen.nationalId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {citizen.lastUpdated}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Chip 
                label={`Card: ${citizen.cardStatus}`} 
                color={getStatusColor(citizen.cardStatus)} 
                sx={{ mb: 1 }}
              />
              <Chip 
                label={`Insurance: ${citizen.insuranceType}`} 
                variant="outlined" 
                color="primary" 
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CreditCardIcon />}
                sx={{ mt: 2 }}
                onClick={handleIssueCard}
              >
                Issue New Card
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="citizen details tabs">
            <Tab icon={<Person />} label="Personal Information" />
            <Tab icon={<LocalHospital />} label="Medical Information" />
            <Tab icon={<History />} label="Card History" />
          </Tabs>
        </Box>
        
        {/* Personal Information Tab */}
        {tabValue === 0 && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Personal Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Date of Birth" secondary={citizen.dateOfBirth} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Gender" secondary={citizen.gender} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Address" secondary={citizen.address} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Phone" secondary={citizen.phone} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Email" secondary={citizen.email} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText 
                        primary="Emergency Contact" 
                        secondary={`${citizen.emergencyContact} (${citizen.emergencyPhone})`} 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {/* Medical Information Tab */}
        {tabValue === 1 && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Medical Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Blood Type" secondary={citizen.bloodType} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Allergies" secondary={citizen.allergies || 'None'} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Chronic Conditions" secondary={citizen.chronicConditions || 'None'} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Insurance Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Insurance Type" secondary={citizen.insuranceType} />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Card Status" secondary={citizen.cardStatus} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {/* Card History Tab */}
        {tabValue === 2 && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Card Usage History
              </Typography>
              {citizen.cardHistory && citizen.cardHistory.length > 0 ? (
                <List>
                  {citizen.cardHistory.map((history, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText 
                          primary={`${history.date} - ${history.action}`}
                          secondary={history.details}
                        />
                      </ListItem>
                      {index < citizen.cardHistory.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No card history available
                </Typography>
              )}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the profile for {citizen.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitizenDetail;