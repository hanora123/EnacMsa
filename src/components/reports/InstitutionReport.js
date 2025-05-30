import React from 'react';
import { Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// تسجيل مكونات ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// بيانات وهمية للرسوم البيانية
const mockData = {
  institutionsByType: {
    labels: ['Hospital', 'Medical Center', 'Pharmacy', 'Lab', 'Insurance Provider'],
    datasets: [
      {
        data: [45, 65, 120, 35, 25],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  },
  institutionsByStatus: {
    labels: ['Active', 'Hold', 'Expiered', 'Pending'],
    datasets: [
      {
        label: ' number of institutions',
        data: [156, 28, 15, 8],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  },
  licenseExpiryTrend: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Expired Licenses',
        data: [5, 8, 3, 7, 12, 9],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Active Licenses',
        data: [4, 6, 2, 5, 8, 7],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  },
};

const InstitutionReport = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('reports.institutionsByType')}</Typography>
              <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <Pie 
                  data={mockData.institutionsByType} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('reports.institutionsByStatus')}</Typography>
              <Box sx={{ height: 250 }}>
                <Bar 
                  data={mockData.institutionsByStatus} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{t('reports.licenseExpiryTrend')}</Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel id="time-period-label">{t('reports.timePeriod')}</InputLabel>
                  <Select
                    labelId="time-period-label"
                    id="time-period-select"
                    label={t('reports.timePeriod')}
                    defaultValue="halfYear"
                  >
                    <MenuItem value="quarter">{t('reports.lastQuarter')}</MenuItem>
                    <MenuItem value="halfYear">{t('reports.lastHalfYear')}</MenuItem>
                    <MenuItem value="year">{t('reports.lastYear')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={mockData.licenseExpiryTrend} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t('reports.keyInsights')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.institutionType')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.institutionStatus')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.licenseExpiry')}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstitutionReport;