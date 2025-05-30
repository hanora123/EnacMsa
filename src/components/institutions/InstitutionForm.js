import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Chip,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    ]
  },
  // ... other institutions
];

const InstitutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newService, setNewService] = useState('');
  
  // Determine if we're editing an existing institution or creating a new one
  const isEditing = Boolean(id);
  
  // Find institution by ID if editing
  const institution = isEditing ? mockInstitutions.find(i => i.id === parseInt(id)) : null;
  
  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(t('validation.required', 'Required')),
    type: Yup.string().required(t('validation.required', 'Required')),
    licenseNumber: Yup.string().required(t('validation.required', 'Required')),
    address: Yup.string().required(t('validation.required', 'Required')),
    phone: Yup.string().required(t('validation.required', 'Required')),
    email: Yup.string().email(t('validation.invalidEmail', 'Invalid email address')).required(t('validation.required', 'Required')),
    contactPerson: Yup.string().required(t('validation.required', 'Required')),
    licenseExpiry: Yup.date().required(t('validation.required', 'Required')),
    description: Yup.string(),
    services: Yup.array().of(Yup.string())
  });
  
  // Initialize formik
  const formik = useFormik({
    initialValues: {
      name: institution?.name || '',
      type: institution?.type || '',
      licenseNumber: institution?.licenseNumber || '',
      address: institution?.address || '',
      phone: institution?.phone || '',
      email: institution?.email || '',
      contactPerson: institution?.contactPerson || '',
      licenseExpiry: institution?.licenseExpiry || '',
      description: institution?.description || '',
      services: institution?.services || []
    },
    validationSchema,
    onSubmit: (values) => {
      // Simulate API call
      console.log('Submitting institution with values:', values);
      setTimeout(() => {
        setSubmitSuccess(true);
        // Redirect after successful submission
        setTimeout(() => {
          navigate('/institutions');
        }, 1500);
      }, 1000);
    },
  });
  
  // Handle adding a new service
  const handleAddService = () => {
    if (newService.trim() !== '') {
      formik.setFieldValue('services', [...formik.values.services, newService.trim()]);
      setNewService('');
    }
  };
  
  // Handle removing a service
  const handleRemoveService = (index) => {
    const updatedServices = [...formik.values.services];
    updatedServices.splice(index, 1);
    formik.setFieldValue('services', updatedServices);
  };
  
  // Handle new service input keypress (add on Enter)
  const handleServiceKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddService();
    }
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/institutions')}
          sx={{ mr: 2 }}
        >
          {t('common.backToList', 'Back to List')}
        </Button>
        <Typography variant="h4" component="h1">
          {isEditing 
            ? t('institutions.editInstitution', 'Edit Institution') 
            : t('institutions.addNewInstitution', 'Add New Institution')}
        </Typography>
      </Box>

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {isEditing 
            ? t('institutions.updateSuccess', 'Institution updated successfully!') 
            : t('institutions.createSuccess', 'Institution created successfully!')}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label={t('institutions.name', 'Institution Name')}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                  <InputLabel id="type-label">{t('institutions.type', 'Institution Type')}</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={t('institutions.type', 'Institution Type')}
                  >
                    <MenuItem value="Hospital">{t('institutions.typeHospital', 'Hospital')}</MenuItem>
                    <MenuItem value="Medical Center">{t('institutions.typeMedicalCenter', 'Medical Center')}</MenuItem>
                    <MenuItem value="Pharmacy">{t('institutions.typePharmacy', 'Pharmacy')}</MenuItem>
                    <MenuItem value="Laboratory">{t('institutions.typeLaboratory', 'Laboratory')}</MenuItem>
                    <MenuItem value="Insurance Provider">{t('institutions.typeInsuranceProvider', 'Insurance Provider')}</MenuItem>
                  </Select>
                  {formik.touched.type && formik.errors.type && (
                    <FormHelperText>{formik.errors.type}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="licenseNumber"
                  name="licenseNumber"
                  label={t('institutions.licenseNumber', 'License Number')}
                  value={formik.values.licenseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
                  helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="licenseExpiry"
                  name="licenseExpiry"
                  label={t('institutions.licenseExpiry', 'License Expiry Date')}
                  type="date"
                  value={formik.values.licenseExpiry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.licenseExpiry && Boolean(formik.errors.licenseExpiry)}
                  helperText={formik.touched.licenseExpiry && formik.errors.licenseExpiry}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {t('institutions.contactInformation', 'Contact Information')}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label={t('institutions.address', 'Address')}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label={t('institutions.phone', 'Phone Number')}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t('institutions.email', 'Email')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="contactPerson"
                  name="contactPerson"
                  label={t('institutions.contactPerson', 'Contact Person')}
                  value={formik.values.contactPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                  helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {t('institutions.additionalInformation', 'Additional Information')}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label={t('institutions.description', 'Description')}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('institutions.services', 'Services Offered')}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      id="newService"
                      label={t('institutions.addService', 'Add Service')}
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={handleServiceKeyPress}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddService}
                      fullWidth
                    >
                      {t('common.add', 'Add')}
                    </Button>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formik.values.services.map((service, index) => (
                    <Chip
                      key={index}
                      label={service}
                      onDelete={() => handleRemoveService(index)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                    startIcon={<SaveIcon />}
                  >
                    {isEditing 
                      ? t('common.update', 'Update') 
                      : t('common.save', 'Save')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InstitutionForm;