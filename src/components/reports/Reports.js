import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  PeopleOutline,
  CreditCardOutlined,
  LocalHospitalOutlined
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CitizenReport from './CitizenReport';
import CardReport from './CardReport';
import InstitutionReport from './InstitutionReport';

// TabPanel component to display tab content
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Helper function for tabs
const a11yProps = (index) => {
  return {
    id: `report-tab-${index}`,
    'aria-controls': `report-tabpanel-${index}`,
  };
};

const Reports = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('reports.title')}
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('reports.overview')}
          </Typography>
          <Typography variant="body1">
            {t('reports.description')}
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab 
            icon={<PeopleOutline />} 
            label={t('reports.citizenReports')} 
            {...a11yProps(0)} 
          />
          <Tab 
            icon={<CreditCardOutlined />} 
            label={t('reports.cardReports')} 
            {...a11yProps(1)} 
          />
          <Tab 
            icon={<LocalHospitalOutlined />} 
            label={t('reports.institutionReports')} 
            {...a11yProps(2)} 
          />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <CitizenReport />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CardReport />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <InstitutionReport />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Reports;