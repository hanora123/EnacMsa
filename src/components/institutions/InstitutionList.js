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
  Add as AddIcon,
  LocalHospital as LocalHospitalIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
    contactPerson: 'Dr. Ahmed Bahi'
  },
  {
    id: 2,
    name: 'Alexandria Medical Center',
    type: 'Medical Center',
    licenseNumber: 'LIC-2023-002',
    address: 'Corniche, Alexandria',
    phone: '+20 3 4876 1234',
    email: 'contact@alexmedcenter.com',
    status: 'Active',
    registrationDate: '2023-02-20',
    licenseExpiry: '2025-02-19',
    contactPerson: 'Dr. Hamada El2a2ra3'
  },
  {
    id: 3,
    name: 'Giza Pharmacy Network',
    type: 'Pharmacy',
    licenseNumber: 'LIC-2023-003',
    address: 'Haram Street, Giza',
    phone: '+20 2 3749 8765',
    email: 'support@gizapharmacy.com',
    status: 'Pending',
    registrationDate: '2023-03-10',
    licenseExpiry: '2025-03-09',
    contactPerson: 'Dr. Aysha '
  },
  {
    id: 4,
    name: 'Luxor Health Insurance',
    type: 'Insurance Provider',
    licenseNumber: 'LIC-2022-004',
    address: 'Main Street, Luxor',
    phone: '+20 95 2367 4321',
    email: 'info@luxorhealth.com',
    status: 'Expired',
    registrationDate: '2022-05-18',
    licenseExpiry: '2023-05-17',
    contactPerson: 'Ms. Fatima Hassan'
  },
  {
    id: 5,
    name: 'Aswan Medical Laboratory',
    type: 'Laboratory',
    licenseNumber: 'LIC-2023-005',
    address: 'Nile Street, Aswan',
    phone: '+20 97 3211 9876',
    email: 'lab@aswanmedical.com',
    status: 'Suspended',
    registrationDate: '2023-04-22',
    licenseExpiry: '2025-04-21',
    contactPerson: 'Dr. Khaled Mahmoud'
  }
];

const InstitutionList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const institutionsPerPage = 10;

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

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setPage(1); // Reset to first page on new filter
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter institutions based on search term and filters
  const filteredInstitutions = mockInstitutions.filter(institution => {
    const matchesSearch = 
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? institution.status === statusFilter : true;
    const matchesType = typeFilter ? institution.type === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Paginate institutions
  const paginatedInstitutions = filteredInstitutions.slice(
    (page - 1) * institutionsPerPage,
    page * institutionsPerPage
  );

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

  // Navigate to institution details
  const handleViewInstitution = (id) => {
    navigate(`/institutions/${id}`);
  };

  // Navigate to edit institution
  const handleEditInstitution = (id) => {
    navigate(`/institutions/${id}/edit`);
  };

  // Navigate to add new institution
  const handleAddInstitution = () => {
    navigate('/institutions/new');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('institutions.title', 'Institutions')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddInstitution}
        >
          {t('institutions.addNewInstitution', 'Add New Institution')}
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('institutions.searchPlaceholder', 'Search by name, license number or contact person...')}
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
                        <InputLabel id="status-filter-label">{t('institutions.status', 'Status')}</InputLabel>
                        <Select
                          labelId="status-filter-label"
                          value={statusFilter}
                          onChange={handleStatusFilterChange}
                          label={t('institutions.status', 'Status')}
                        >
                          <MenuItem value="">{t('common.all', 'All')}</MenuItem>
                          <MenuItem value="Active">{t('institutions.statusActive', 'Active')}</MenuItem>
                          <MenuItem value="Pending">{t('institutions.statusPending', 'Pending')}</MenuItem>
                          <MenuItem value="Expired">{t('institutions.statusExpired', 'Expired')}</MenuItem>
                          <MenuItem value="Suspended">{t('institutions.statusSuspended', 'Suspended')}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="type-filter-label">{t('institutions.type', 'Type')}</InputLabel>
                        <Select
                          labelId="type-filter-label"
                          value={typeFilter}
                          onChange={handleTypeFilterChange}
                          label={t('institutions.type', 'Type')}
                        >
                          <MenuItem value="">{t('common.all', 'All')}</MenuItem>
                          <MenuItem value="Hospital">{t('institutions.typeHospital', 'Hospital')}</MenuItem>
                          <MenuItem value="Medical Center">{t('institutions.typeMedicalCenter', 'Medical Center')}</MenuItem>
                          <MenuItem value="Pharmacy">{t('institutions.typePharmacy', 'Pharmacy')}</MenuItem>
                          <MenuItem value="Laboratory">{t('institutions.typeLaboratory', 'Laboratory')}</MenuItem>
                          <MenuItem value="Insurance Provider">{t('institutions.typeInsuranceProvider', 'Insurance Provider')}</MenuItem>
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
              <TableCell>{t('institutions.name', 'Name')}</TableCell>
              <TableCell>{t('institutions.type', 'Type')}</TableCell>
              <TableCell>{t('institutions.licenseNumber', 'License Number')}</TableCell>
              <TableCell>{t('institutions.contactPerson', 'Contact Person')}</TableCell>
              <TableCell>{t('institutions.licenseExpiry', 'License Expiry')}</TableCell>
              <TableCell>{t('institutions.status', 'Status')}</TableCell>
              <TableCell>{t('common.actions', 'Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInstitutions.length > 0 ? (
              paginatedInstitutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell>{institution.name}</TableCell>
                  <TableCell>{institution.type}</TableCell>
                  <TableCell>{institution.licenseNumber}</TableCell>
                  <TableCell>{institution.contactPerson}</TableCell>
                  <TableCell>{institution.licenseExpiry}</TableCell>
                  <TableCell>
                    <Chip 
                      label={institution.status} 
                      color={getStatusColor(institution.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewInstitution(institution.id)}
                      title={t('common.view', 'View')}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => handleEditInstitution(institution.id)}
                      title={t('common.edit', 'Edit')}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {t('institutions.noInstitutionsFound', 'No institutions found matching your criteria')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredInstitutions.length > institutionsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={Math.ceil(filteredInstitutions.length / institutionsPerPage)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default InstitutionList;