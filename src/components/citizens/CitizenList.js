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
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for citizens (will be replaced with actual API calls)
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
    lastUpdated: '2023-10-12'
  },
  {
    id: 2,
    nationalId: '30112345678902',
    name: 'Sara Ahmed',
    dateOfBirth: '2001-08-22',
    gender: 'Female',
    address: 'Alexandria, Egypt',
    phone: '+20 123 456 7891',
    email: 'sara.ahmed@example.com',
    cardStatus: 'Pending',
    insuranceType: 'Basic',
    lastUpdated: '2023-11-05'
  },
  {
    id: 3,
    nationalId: '28512345678903',
    name: 'Mahmoud Ali',
    dateOfBirth: '1985-03-10',
    gender: 'Male',
    address: 'Giza, Egypt',
    phone: '+20 123 456 7892',
    email: 'mahmoud.ali@example.com',
    cardStatus: 'Expired',
    insuranceType: 'Premium',
    lastUpdated: '2023-09-18'
  },
  {
    id: 4,
    nationalId: '29712345678904',
    name: 'Fatima Hussein',
    dateOfBirth: '1997-11-28',
    gender: 'Female',
    address: 'Luxor, Egypt',
    phone: '+20 123 456 7893',
    email: 'fatima.hussein@example.com',
    cardStatus: 'Active',
    insuranceType: 'Comprehensive',
    lastUpdated: '2023-10-30'
  },
];

const CitizenList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    cardStatus: '',
    insuranceType: '',
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  // Filter citizens based on search term and filters
  const filteredCitizens = mockCitizens.filter(citizen => {
    const matchesSearch = citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.nationalId.includes(searchTerm) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCardStatus = filters.cardStatus ? citizen.cardStatus === filters.cardStatus : true;
    const matchesInsuranceType = filters.insuranceType ? citizen.insuranceType === filters.insuranceType : true;
    
    return matchesSearch && matchesCardStatus && matchesInsuranceType;
  });

  // Navigate to add new citizen page
  const handleAddCitizen = () => {
    navigate('/citizens/new');
  };

  // Navigate to citizen detail page
  const handleViewCitizen = (id) => {
    navigate(`/citizens/${id}`);
  };

  // Navigate to edit citizen page
  const handleEditCitizen = (id) => {
    navigate(`/citizens/${id}/edit`);
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Citizen Profiles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCitizen}
        >
          Add New Citizen
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, ID, or email"
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
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={toggleFilters}
              >
                Filters
              </Button>
            </Grid>

            {filterOpen && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Card Status</InputLabel>
                        <Select
                          name="cardStatus"
                          value={filters.cardStatus}
                          label="Card Status"
                          onChange={handleFilterChange}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Expired">Expired</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Insurance Type</InputLabel>
                        <Select
                          name="insuranceType"
                          value={filters.insuranceType}
                          label="Insurance Type"
                          onChange={handleFilterChange}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="Basic">Basic</MenuItem>
                          <MenuItem value="Comprehensive">Comprehensive</MenuItem>
                          <MenuItem value="Premium">Premium</MenuItem>
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

      {filteredCitizens.length > 0 ? (
        <>
          {filteredCitizens.map((citizen) => (
            <Card key={citizen.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">{citizen.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {citizen.nationalId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {citizen.phone}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {citizen.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Chip 
                      label={citizen.cardStatus} 
                      color={getStatusColor(citizen.cardStatus)} 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Insurance:</strong> {citizen.insuranceType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewCitizen(citizen.id)}
                      title="View details"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => handleEditCitizen(citizen.id)}
                      title="Edit profile"
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination count={10} color="primary" />
          </Box>
        </>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6">No citizens found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CitizenList;