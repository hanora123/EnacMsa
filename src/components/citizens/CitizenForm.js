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
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack, Save, ArrowForward } from '@mui/icons-material';

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
    lastUpdated: '2023-10-12'
  },
  // ... other citizens
];

const CitizenForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';
  const [activeStep, setActiveStep] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form steps
  const steps = ['Personal Information', 'Contact Details', 'Medical Information'];

  // Initialize form with data if in edit mode
  const initialValues = isEditMode
    ? mockCitizens.find(citizen => citizen.id === parseInt(id)) || {
        nationalId: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        insuranceType: '',
        emergencyContact: '',
        emergencyPhone: '',
        bloodType: '',
        allergies: '',
        chronicConditions: ''
      }
    : {
        nationalId: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
        insuranceType: 'Basic',
        emergencyContact: '',
        emergencyPhone: '',
        bloodType: '',
        allergies: '',
        chronicConditions: ''
      };

  // Form validation schema
  const validationSchema = Yup.object({
    nationalId: Yup.string()
      .required('National ID is required')
      .matches(/^\d{14}$/, 'National ID must be 14 digits'),
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
    gender: Yup.string()
      .required('Gender is required'),
    address: Yup.string()
      .required('Address is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9\s]+$/, 'Invalid phone number format'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    insuranceType: Yup.string()
      .required('Insurance type is required'),
    emergencyContact: Yup.string()
      .required('Emergency contact name is required'),
    emergencyPhone: Yup.string()
      .required('Emergency contact phone is required')
      .matches(/^\+?[0-9\s]+$/, 'Invalid phone number format'),
    bloodType: Yup.string()
      .required('Blood type is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', values);
        setSubmitSuccess(true);
        // Redirect after successful submission
        setTimeout(() => {
          navigate('/citizens');
        }, 1500);
      }, 1000);
    },
  });

  // Handle step navigation
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Check if current step is valid
  const isStepValid = () => {
    const stepFields = {
      0: ['nationalId', 'name', 'dateOfBirth', 'gender'],
      1: ['address', 'phone', 'email', 'emergencyContact', 'emergencyPhone'],
      2: ['bloodType', 'insuranceType']
    };

    return stepFields[activeStep].every(field => {
      const touched = formik.touched[field];
      const error = formik.errors[field];
      const value = formik.values[field];
      
      // If field is not touched, check if it has a value
      if (!touched) {
        return !!value;
      }
      
      // If field is touched, check if it has no error
      return !error;
    });
  };

  // Render form fields based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Personal Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="nationalId"
                name="nationalId"
                label="National ID"
                value={formik.values.nationalId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nationalId && Boolean(formik.errors.nationalId)}
                helperText={formik.touched.nationalId && formik.errors.nationalId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  label="Gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText>{formik.errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      
      case 1: // Contact Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
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
                label="Phone Number"
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
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Emergency Contact
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="emergencyContact"
                name="emergencyContact"
                label="Emergency Contact Name"
                value={formik.values.emergencyContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emergencyContact && Boolean(formik.errors.emergencyContact)}
                helperText={formik.touched.emergencyContact && formik.errors.emergencyContact}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="emergencyPhone"
                name="emergencyPhone"
                label="Emergency Contact Phone"
                value={formik.values.emergencyPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emergencyPhone && Boolean(formik.errors.emergencyPhone)}
                helperText={formik.touched.emergencyPhone && formik.errors.emergencyPhone}
              />
            </Grid>
          </Grid>
        );
      
      case 2: // Medical Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth
                error={formik.touched.bloodType && Boolean(formik.errors.bloodType)}
              >
                <InputLabel>Blood Type</InputLabel>
                <Select
                  id="bloodType"
                  name="bloodType"
                  value={formik.values.bloodType}
                  label="Blood Type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
                {formik.touched.bloodType && formik.errors.bloodType && (
                  <FormHelperText>{formik.errors.bloodType}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth
                error={formik.touched.insuranceType && Boolean(formik.errors.insuranceType)}
              >
                <InputLabel>Insurance Type</InputLabel>
                <Select
                  id="insuranceType"
                  name="insuranceType"
                  value={formik.values.insuranceType}
                  label="Insurance Type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Comprehensive">Comprehensive</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </Select>
                {formik.touched.insuranceType && formik.errors.insuranceType && (
                  <FormHelperText>{formik.errors.insuranceType}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="allergies"
                name="allergies"
                label="Allergies"
                placeholder="List any allergies or type 'None'"
                value={formik.values.allergies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="chronicConditions"
                name="chronicConditions"
                label="Chronic Conditions"
                placeholder="List any chronic conditions or type 'None'"
                value={formik.values.chronicConditions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/citizens')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Citizen Profile' : 'Add New Citizen'}
        </Typography>
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile {isEditMode ? 'updated' : 'created'} successfully!
        </Alert>
      )}

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {renderStepContent()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isStepValid() || formik.isSubmitting}
                    startIcon={<Save />}
                  >
                    {isEditMode ? 'Update Profile' : 'Create Profile'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    endIcon={<ArrowForward />}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CitizenForm;