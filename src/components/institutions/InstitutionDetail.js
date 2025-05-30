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
  ArrowBack,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Refresh as RefreshIcon,
  LocalHospital as LocalHospitalIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Mock institution data (will be replaced with API calls)
const mockInstitutions = [
  {
    id: 1,
    name: 'Cairo Central Hospital',
    type: 'Hospital',
    licenseNumber: 'LIC-2023-001',
    address: 'Downtown, Cairo',
    phone: '+20 2 2755 0000',
    email: 'info@cairocentralhospital.com',
    status: 'Active',
    registrationDate: '2023-01-15',
    licenseExpiry: '2025-01-14',
    contactPerson: 'Dr. Ahmed Mahmoud',
    description: 'A leading healthcare provider in Cairo with state-of-the-art facilities.',
    services: [
      'Emergency Care',
      'Surgery',
      'Cardiology',
      'Pediatrics',
      'Obstetrics & Gynecology'
    ],
    cardUsageHistory: [
      { date: '2023-10-15', citizenName: 'Ahmed Mohamed', service: 'Emergency Care', cardNumber: 'NFC-2023-001' },
      { date: '2023-10-10', citizenName: 'Sara Ahmed', service: 'Cardiology Checkup', cardNumber: 'NFC-2023-002' },
      { date: '2023-10-05', citizenName: 'Mahmoud Ali', service: 'Surgery', cardNumber: 'NFC-2023-003' },
    ]
  },
  // ... other institutions
];

const InstitutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Find institution by ID
  const institution = mockInstitutions.find(i => i.id === parseInt(id));

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle edit institution
  const handleEditInstitution = () => {
    navigate(`/institutions/${id}/edit`);
  };

  // Handle delete dialog
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Simulate API call
    console.log('Deleting institution:', id);
    setDeleteDialogOpen(false);
    setActionSuccess(t('institutions.institutionDeleted', 'Institution deleted successfully'));
    // Redirect after successful deletion
    setTimeout(() => {
      navigate('/institutions');
    }, 1500);
  };

  // Handle suspend dialog
  const handleSuspendClick = () => {
    setSuspendDialogOpen(true);
  };

  const handleSuspendClose = () => {
    setSuspendDialogOpen(false);
  };

  const handleSuspendConfirm = () => {
    // Simulate API call
    console.log('Suspending institution:', id);
    setSuspendDialogOpen(false);
    setActionSuccess(t('institutions.institutionSuspended', 'Institution suspended successfully'));
  };

  // Handle renew license
  const handleRenewLicense = () => {
    console.log('Renewing license for institution:', id);
    setActionSuccess(t('institutions.licenseRenewed', 'License renewal initiated'));
  };

  // Get status color based on institution status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Expired':
        return 'error';
      case 'Suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  // If institution not found
  if (!institution) {
    return (
      <Box>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          {t('institutions.institutionNotFound', 'Institution not found')}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/institutions')}
          startIcon={<ArrowBack />}
        >
          {t('common.backToList', 'Back to List')}
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/institutions')}
          sx={{ mr: 2 }}
        >
          {t('common.backToList', 'Back to List')}
        </Button>
      </Box>

      {actionSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionSuccess}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {institution.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {t('institutions.licenseNumber', 'License Number')}: {institution.licenseNumber}
              </Typography>
            </Box>
            <Chip 
              label={institution.status} 
              color={getStatusColor(institution.status)} 
              sx={{ fontSize: '1rem', py: 1, px: 1 }} 
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditInstitution}
                fullWidth
              >
                {t('common.edit', 'Edit')}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<RefreshIcon />}
                onClick={handleRenewLicense}
                fullWidth
                disabled={institution.status !== 'Expired'}
              >
                {t('institutions.renewLicense', 'Renew License')}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="error"
                startIcon={institution.status === 'Active' ? <BlockIcon /> : <DeleteIcon />}
                onClick={institution.status === 'Active' ? handleSuspendClick : handleDeleteClick}
                fullWidth
              >
                {institution.status === 'Active' 
                  ? t('institutions.suspend', 'Suspend') 
                  : t('common.delete', 'Delete')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="institution details tabs">
          <Tab label={t('institutions.details', 'Details')} />
          <Tab label={t('institutions.services', 'Services')} />
          <Tab label={t('institutions.cardUsage', 'Card Usage History')} />
        </Tabs>
      </Box>

      {/* Details Tab */}
      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {t('institutions.basicInformation', 'Basic Information')}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.type', 'Type')} 
                      secondary={institution.type} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.registrationDate', 'Registration Date')} 
                      secondary={institution.registrationDate} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.licenseExpiry', 'License Expiry')} 
                      secondary={institution.licenseExpiry} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.status', 'Status')} 
                      secondary={institution.status} 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {t('institutions.contactInformation', 'Contact Information')}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.address', 'Address')} 
                      secondary={institution.address} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.phone', 'Phone')} 
                      secondary={institution.phone} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.email', 'Email')} 
                      secondary={institution.email} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('institutions.contactPerson', 'Contact Person')} 
                      secondary={institution.contactPerson} 
                    />
                  </ListItem>
                </List>
              </Grid>
              {institution.description && (
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {t('institutions.description', 'Description')}
                  </Typography>
                  <Typography variant="body1">
                    {institution.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Services Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('institutions.availableServices', 'Available Services')}
            </Typography>
            {institution.services && institution.services.length > 0 ? (
              <List>
                {institution.services.map((service, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={service} />
                    </ListItem>
                    {index < institution.services.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                {t('institutions.noServicesListed', 'No services listed for this institution')}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card Usage History Tab */}
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('institutions.cardUsageHistory', 'Card Usage History')}
            </Typography>
            {institution.cardUsageHistory && institution.cardUsageHistory.length > 0 ? (
              <List>
                {institution.cardUsageHistory.map((usage, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={`${usage.date} - ${usage.citizenName}`}
                        secondary={`${usage.service} (${t('cardManagement.cardNumber', 'Card Number')}: ${usage.cardNumber})`}
                      />
                    </ListItem>
                    {index < institution.cardUsageHistory.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                {t('institutions.noCardUsageHistory', 'No card usage history available')}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
      >
        <DialogTitle>{t('institutions.confirmDeletion', 'Confirm Deletion')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('institutions.deleteWarning', 'Are you sure you want to delete this institution? This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            {t('common.delete', 'Delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <Dialog
        open={suspendDialogOpen}
        onClose={handleSuspendClose}
      >
        <DialogTitle>{t('institutions.confirmSuspension', 'Confirm Suspension')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('institutions.suspendWarning', 'Are you sure you want to suspend this institution? They will not be able to use the system until reactivated.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuspendClose} color="primary">
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleSuspendConfirm} color="error" variant="contained">
            {t('institutions.suspend', 'Suspend')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstitutionDetail;