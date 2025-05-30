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
  Print as PrintIcon,
  Block as BlockIcon,
  Refresh as RefreshIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Mock card data (will be replaced with API calls)
const mockCards = [
  {
    id: 1,
    cardNumber: 'NFC-2023-001',
    citizenId: 1,
    citizenName: 'Ahmed Mohamed',
    nationalId: '29012345678901',
    issueDate: '2023-01-15',
    expiryDate: '2028-01-14',
    status: 'Active',
    insuranceType: 'Comprehensive',
    lastUsed: '2023-08-10',
    usageHistory: [
      { date: '2023-01-15', action: 'Card Issued', location: 'Main Office', details: 'Initial card issuance' },
      { date: '2023-05-20', action: 'Card Used', location: 'Cairo Hospital', details: 'Emergency room visit' },
      { date: '2023-08-10', action: 'Card Used', location: 'Central Pharmacy', details: 'Prescription refill' },
    ]
  },
  // ... other cards
];

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Find card by ID
  const card = mockCards.find(c => c.id === parseInt(id));

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
    console.log('Suspending card:', id);
    setSuspendDialogOpen(false);
    setActionSuccess(t('cardManagement.cardSuspended', 'Card suspended successfully'));
  };

  // Handle print card
  const handlePrintCard = () => {
    console.log('Printing card:', id);
    setActionSuccess(t('cardManagement.cardPrinted', 'Card sent to printer'));
  };

  // Handle renew card
  const handleRenewCard = () => {
    console.log('Renewing card:', id);
    setActionSuccess(t('cardManagement.cardRenewed', 'Card renewal initiated'));
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
      case 'Suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  // If card not found
  if (!card) {
    return (
      <Box>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          {t('cardManagement.cardNotFound', 'Card not found')}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/cards')}
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
          onClick={() => navigate('/cards')}
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
                {card.cardNumber}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {t('cardManagement.lastUpdated', 'Last Updated')}: {card.lastUsed || t('cardManagement.neverUsed', 'Never Used')}
              </Typography>
            </Box>
            <Chip 
              label={card.status} 
              color={getStatusColor(card.status)} 
              sx={{ fontSize: '1rem', py: 1, px: 1 }} 
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrintCard}
                fullWidth
              >
                {t('cardManagement.printCard', 'Print Card')}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<RefreshIcon />}
                onClick={handleRenewCard}
                fullWidth
                disabled={card.status !== 'Expired'}
              >
                {t('cardManagement.renewCard', 'Renew Card')}
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<BlockIcon />}
                onClick={handleSuspendClick}
                fullWidth
                disabled={card.status !== 'Active'}
              >
                {t('cardManagement.suspendCard', 'Suspend Card')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="card details tabs">
          <Tab label={t('cardManagement.cardDetails', 'Card Details')} />
          <Tab label={t('cardManagement.usageHistory', 'Usage History')} />
        </Tabs>
      </Box>

      {/* Card Details Tab */}
      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {t('cardManagement.cardInformation', 'Card Information')}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.cardNumber', 'Card Number')} 
                      secondary={card.cardNumber} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.issueDate', 'Issue Date')} 
                      secondary={card.issueDate} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.expiryDate', 'Expiry Date')} 
                      secondary={card.expiryDate} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.status', 'Status')} 
                      secondary={card.status} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.insuranceType', 'Insurance Type')} 
                      secondary={card.insuranceType} 
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {t('cardManagement.citizenInformation', 'Citizen Information')}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.citizenName', 'Citizen Name')} 
                      secondary={card.citizenName} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText 
                      primary={t('cardManagement.nationalId', 'National ID')} 
                      secondary={card.nationalId} 
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <Button 
                      variant="text" 
                      color="primary"
                      onClick={() => navigate(`/citizens/${card.citizenId}`)}
                    >
                      {t('cardManagement.viewCitizenProfile', 'View Citizen Profile')}
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Usage History Tab */}
      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('cardManagement.usageHistory', 'Card Usage History')}
            </Typography>
            {card.usageHistory && card.usageHistory.length > 0 ? (
              <List>
                {card.usageHistory.map((history, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={`${history.date} - ${history.action} (${history.location})`}
                        secondary={history.details}
                      />
                    </ListItem>
                    {index < card.usageHistory.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                {t('cardManagement.noUsageHistory', 'No usage history available')}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Suspend Confirmation Dialog */}
      <Dialog
        open={suspendDialogOpen}
        onClose={handleSuspendClose}
      >
        <DialogTitle>{t('cardManagement.confirmSuspension', 'Confirm Card Suspension')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('cardManagement.suspendWarning', 'Are you sure you want to suspend this card? The citizen will not be able to use it until it is reactivated.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuspendClose} color="primary">
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleSuspendConfirm} color="error" variant="contained">
            {t('cardManagement.suspend', 'Suspend')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardDetail;