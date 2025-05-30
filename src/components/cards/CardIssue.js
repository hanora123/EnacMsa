import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Alert,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import {
  ArrowBack,
  Search as SearchIcon,
  CreditCard as CreditCardIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

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
    insuranceType: 'Comprehensive'
  },
  {
    id: 2,
    nationalId: '29512345678902',
    name: 'Sara Ahmed',
    dateOfBirth: '1995-08-20',
    gender: 'Female',
    address: 'Alexandria, Egypt',
    phone: '+20 123 456 7891',
    email: 'sara.ahmed@example.com',
    cardStatus: 'None',
    insuranceType: 'Basic'
  },
  {
    id: 3,
    nationalId: '29212345678903',
    name: 'Mohamed Ali',
    dateOfBirth: '1992-03-10',
    gender: 'Male',
    address: 'Giza, Egypt',
    phone: '+20 123 456 7892',
    email: 'mohamed.ali@example.com',
    cardStatus: 'Expired',
    insuranceType: 'Premium'
  }
];

const CardIssue = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle search
  const handleSearch = () => {
    if (!searchTerm) return;
    
    const results = mockCitizens.filter(citizen => 
      citizen.nationalId.includes(searchTerm) || 
      citizen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
  };

  // Handle citizen selection
  const handleSelectCitizen = (citizen) => {
    setSelectedCitizen(citizen);
    formik.setFieldValue('citizenId', citizen.id);
    formik.setFieldValue('nationalId', citizen.nationalId);
    formik.setFieldValue('citizenName', citizen.name);
    formik.setFieldValue('insuranceType', citizen.insuranceType);
    setSearchResults([]);
  };

  // Form validation schema
  const validationSchema = Yup.object({
    citizenId: Yup.number().required(t('validation.required', 'Required')),
    nationalId: Yup.string().required(t('validation.required', 'Required')),
    citizenName: Yup.string().required(t('validation.required', 'Required')),
    insuranceType: Yup.string().required(t('validation.required', 'Required')),
    validityYears: Yup.number()
      .required(t('validation.required', 'Required'))
      .min(1, t('validation.min', 'Must be at least {{min}}', { min: 1 }))
      .max(10, t('validation.max', 'Must be at most {{max}}', { max: 10 }))
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      citizenId: '',
      nationalId: '',
      citizenName: '',
      insuranceType: '',
      validityYears: 5
    },
    validationSchema,
    onSubmit: (values) => {
      // Simulate API call
      console.log('Issuing card with values:', values);
      setTimeout(() => {
        setSubmitSuccess(true);
        // Redirect after successful submission
        setTimeout(() => {
          navigate('/cards');
        }, 1500);
      }, 1000);
    },
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/cards')}
          sx={{ mr: 2 }}
        >
          {t('common.backToList', 'Back to List')}
        </Button>
        <Typography variant="h4" component="h1">
          {t('cardManagement.issueNewCard', 'Issue New Card')}
        </Typography>
      </Box>

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('cardManagement.cardIssueSuccess', 'Card issued successfully!')}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('cardManagement.findCitizen', 'Find Citizen')}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('cardManagement.searchCitizenPlaceholder', 'Search by national ID or name...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<PersonIcon />}
                fullWidth
              >
                {t('common.search', 'Search')}
              </Button>
            </Grid>
          </Grid>

          {searchResults.length > 0 && (
            <Paper sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
              <List>
                {searchResults.map((citizen) => (
                  <ListItem 
                    key={citizen.id} 
                    button 
                    onClick={() => handleSelectCitizen(citizen)}
                    divider
                  >
                    <ListItemText
                      primary={citizen.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {t('cardManagement.nationalId', 'National ID')}: {citizen.nationalId}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            {t('cardManagement.insuranceType', 'Insurance Type')}: {citizen.insuranceType}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            {t('cardManagement.cardStatus', 'Card Status')}: {citizen.cardStatus}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {searchResults.length === 0 && searchTerm && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {t('cardManagement.noCitizenFound', 'No citizen found with the provided information')}
            </Alert>
          )}
        </CardContent>
      </Card>

      {selectedCitizen && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('cardManagement.issueCardFor', 'Issue Card for')} {selectedCitizen.name}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="nationalId"
                    name="nationalId"
                    label={t('cardManagement.nationalId', 'National ID')}
                    value={formik.values.nationalId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="citizenName"
                    name="citizenName"
                    label={t('cardManagement.citizenName', 'Citizen Name')}
                    value={formik.values.citizenName}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="insurance-type-label">
                      {t('cardManagement.insuranceType', 'Insurance Type')}
                    </InputLabel>
                    <Select
                      labelId="insurance-type-label"
                      id="insuranceType"
                      name="insuranceType"
                      value={formik.values.insuranceType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.insuranceType && Boolean(formik.errors.insuranceType)}
                      label={t('cardManagement.insuranceType', 'Insurance Type')}
                    >
                      <MenuItem value="Basic">{t('cardManagement.insuranceBasic', 'Basic')}</MenuItem>
                      <MenuItem value="Comprehensive">{t('cardManagement.insuranceComprehensive', 'Comprehensive')}</MenuItem>
                      <MenuItem value="Premium">{t('cardManagement.insurancePremium', 'Premium')}</MenuItem>
                    </Select>
                    {formik.touched.insuranceType && formik.errors.insuranceType && (
                      <FormHelperText error>{formik.errors.insuranceType}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="validityYears"
                    name="validityYears"
                    label={t('cardManagement.validityYears', 'Validity (Years)')}
                    type="number"
                    value={formik.values.validityYears}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.validityYears && Boolean(formik.errors.validityYears)}
                    helperText={formik.touched.validityYears && formik.errors.validityYears}
                    InputProps={{
                      inputProps: { min: 1, max: 10 }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={formik.isSubmitting}
                      startIcon={<CreditCardIcon />}
                    >
                      {t('cardManagement.issueCard', 'Issue Card')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CardIssue;