import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
    lastUsed: '2023-08-10'
  },
  {
    id: 2,
    cardNumber: 'NFC-2023-002',
    citizenId: 2,
    citizenName: 'Sara Ahmed',
    nationalId: '29512345678902',
    issueDate: '2023-02-20',
    expiryDate: '2028-02-19',
    status: 'Active',
    insuranceType: 'Basic',
    lastUsed: '2023-07-15'
  },
  {
    id: 3,
    cardNumber: 'NFC-2023-003',
    citizenId: 3,
    citizenName: 'Mohamed Ali',
    nationalId: '29212345678903',
    issueDate: '2023-03-10',
    expiryDate: '2028-03-09',
    status: 'Pending',
    insuranceType: 'Premium',
    lastUsed: null
  },
  {
    id: 4,
    cardNumber: 'NFC-2022-004',
    citizenId: 4,
    citizenName: 'Fatima Hassan',
    nationalId: '29312345678904',
    issueDate: '2022-05-18',
    expiryDate: '2027-05-17',
    status: 'Expired',
    insuranceType: 'Basic',
    lastUsed: '2022-12-30'
  },
  {
    id: 5,
    cardNumber: 'NFC-2023-005',
    citizenId: 5,
    citizenName: 'Khaled Mahmoud',
    nationalId: '29412345678905',
    issueDate: '2023-04-22',
    expiryDate: '2028-04-21',
    status: 'Suspended',
    insuranceType: 'Comprehensive',
    lastUsed: '2023-06-05'
  }
];

const CardList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [insuranceTypeFilter, setInsuranceTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const cardsPerPage = 10;

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Toggle filter panel
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Handle filter changes
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1); // Reset to first page on new filter
  };

  const handleInsuranceTypeFilterChange = (event) => {
    setInsuranceTypeFilter(event.target.value);
    setPage(1); // Reset to first page on new filter
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter cards based on search term and filters
  const filteredCards = mockCards.filter(card => {
    const matchesSearch = 
      card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.nationalId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? card.status === statusFilter : true;
    const matchesInsuranceType = insuranceTypeFilter ? card.insuranceType === insuranceTypeFilter : true;
    
    return matchesSearch && matchesStatus && matchesInsuranceType;
  });

  // Paginate cards
  const paginatedCards = filteredCards.slice(
    (page - 1) * cardsPerPage,
    page * cardsPerPage
  );

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

  // Navigate to card details
  const handleViewCard = (id) => {
    navigate(`/cards/${id}`);
  };

  // Navigate to issue new card
  const handleIssueNewCard = () => {
    navigate('/cards/issue');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('cardManagement.title', 'Card Management')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CreditCardIcon />}
          onClick={handleIssueNewCard}
        >
          {t('cardManagement.issueNewCard', 'Issue New Card')}
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('cardManagement.searchPlaceholder', 'Search by card number, citizen name or ID...')}
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleFilter}
                sx={{ ml: { xs: 0, md: 2 } }}
              >
                {t('common.filter', 'Filter')}
              </Button>
            </Grid>

            {filterOpen && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="status-filter-label">{t('cardManagement.status', 'Card Status')}</InputLabel>
                        <Select
                          labelId="status-filter-label"
                          value={statusFilter}
                          onChange={handleStatusFilterChange}
                          label={t('cardManagement.status', 'Card Status')}
                        >
                          <MenuItem value="">{t('common.all', 'All')}</MenuItem>
                          <MenuItem value="Active">{t('cardManagement.statusActive', 'Active')}</MenuItem>
                          <MenuItem value="Pending">{t('cardManagement.statusPending', 'Pending')}</MenuItem>
                          <MenuItem value="Expired">{t('cardManagement.statusExpired', 'Expired')}</MenuItem>
                          <MenuItem value="Suspended">{t('cardManagement.statusSuspended', 'Suspended')}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="insurance-type-filter-label">{t('cardManagement.insuranceType', 'Insurance Type')}</InputLabel>
                        <Select
                          labelId="insurance-type-filter-label"
                          value={insuranceTypeFilter}
                          onChange={handleInsuranceTypeFilterChange}
                          label={t('cardManagement.insuranceType', 'Insurance Type')}
                        >
                          <MenuItem value="">{t('common.all', 'All')}</MenuItem>
                          <MenuItem value="Basic">{t('cardManagement.insuranceBasic', 'Basic')}</MenuItem>
                          <MenuItem value="Comprehensive">{t('cardManagement.insuranceComprehensive', 'Comprehensive')}</MenuItem>
                          <MenuItem value="Premium">{t('cardManagement.insurancePremium', 'Premium')}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('cardManagement.cardNumber', 'Card Number')}</TableCell>
              <TableCell>{t('cardManagement.citizenName', 'Citizen Name')}</TableCell>
              <TableCell>{t('cardManagement.nationalId', 'National ID')}</TableCell>
              <TableCell>{t('cardManagement.issueDate', 'Issue Date')}</TableCell>
              <TableCell>{t('cardManagement.expiryDate', 'Expiry Date')}</TableCell>
              <TableCell>{t('cardManagement.status', 'Status')}</TableCell>
              <TableCell>{t('cardManagement.insuranceType', 'Insurance Type')}</TableCell>
              <TableCell>{t('common.actions', 'Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCards.length > 0 ? (
              paginatedCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.cardNumber}</TableCell>
                  <TableCell>{card.citizenName}</TableCell>
                  <TableCell>{card.nationalId}</TableCell>
                  <TableCell>{card.issueDate}</TableCell>
                  <TableCell>{card.expiryDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={card.status} 
                      color={getStatusColor(card.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{card.insuranceType}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewCard(card.id)}
                      title={t('common.view', 'View')}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  {t('cardManagement.noCardsFound', 'No cards found matching your criteria')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredCards.length > cardsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={Math.ceil(filteredCards.length / cardsPerPage)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default CardList;