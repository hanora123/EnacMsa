import React from 'react';
import { Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register Chart.js components
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

// Mock data (will be replaced with actual data from backend)
const mockData = {
  citizensByAge: {
    labels: ['0-18', '19-30', '31-45', '46-60', '61+'],
    datasets: [
      {
        label: 'عدد المواطنين',
        data: [4500, 6800, 5400, 4200, 3900],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  },
  citizensByGender: {
    labels: ['female', 'male'],
    datasets: [
      {
        data: [12500, 12300],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  },
  citizenRegistrationTrend: {
    labels: ['january', 'february', 'march', 'april', 'may', 'june'],
    datasets: [
      {
        label: 'New Registrations',
        data: [250, 320, 280, 360, 410, 380],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  },
};

const CitizenReport = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{t('reports.citizensByAge')}</Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel id="time-period-label">{t('reports.timePeriod')}</InputLabel>
                  <Select
                    labelId="time-period-label"
                    id="time-period-select"
                    label={t('reports.timePeriod')}
                    defaultValue="year"
                  >
                    <MenuItem value="month">{t('reports.lastMonth')}</MenuItem>
                    <MenuItem value="quarter">{t('reports.lastQuarter')}</MenuItem>
                    <MenuItem value="year">{t('reports.lastYear')}</MenuItem>
                    <MenuItem value="all">{t('reports.allTime')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={mockData.citizensByAge} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: false,
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
              <Typography variant="h6" gutterBottom>{t('reports.citizensByGender')}</Typography>
              <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <Pie 
                  data={mockData.citizensByGender} 
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
              <Typography variant="h6" gutterBottom>{t('reports.registrationTrend')}</Typography>
              <Box sx={{ height: 250 }}>
                <Line 
                  data={mockData.citizenRegistrationTrend} 
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
            <Typography variant="body2" paragraph>• {t('reports.insights.citizenAge')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.citizenGender')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.registrationTrend')}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CitizenReport;