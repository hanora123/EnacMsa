import React from 'react';
import { Box, Typography, Grid, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
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

const CardReport = () => {
  const { t } = useTranslation();
  
  // Mock data for charts
  const mockData = {
    cardsByStatus: {
      labels: [
        t('reports.cardStatus.active'), 
        t('reports.cardStatus.pending'), 
        t('reports.cardStatus.expired'), 
        t('reports.cardStatus.revoked')
      ],
      datasets: [
        {
          data: [15200, 420, 2100, 980],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    },
    cardIssuanceTrend: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Cards Issued',
          data: [520, 480, 640, 580, 720, 680],
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1,
          fill: false,
        },
      ],
    },
    cardUsageByInstitution: {
      labels: ['Hospitals', 'Medical Centers', 'Pharmacies', 'Laboratories', 'Insurance Providers'],
      datasets: [
        {
          label: 'Number of Transactions',
          data: [3200, 2800, 5400, 1800, 1200],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    },
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{t('reports.cardsByStatus')}</Typography>
              <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                <Doughnut 
                  data={mockData.cardsByStatus} 
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
              <Typography variant="h6" gutterBottom>{t('reports.cardIssuanceTrend')}</Typography>
              <Box sx={{ height: 250 }}>
                <Line 
                  data={mockData.cardIssuanceTrend} 
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
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{t('reports.cardUsageByInstitution')}</Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel id="time-period-label">{t('reports.timePeriod')}</InputLabel>
                  <Select
                    labelId="time-period-label"
                    id="time-period-select"
                    label={t('reports.timePeriod')}
                    defaultValue="month"
                  >
                    <MenuItem value="week">{t('reports.lastWeek')}</MenuItem>
                    <MenuItem value="month">{t('reports.lastMonth')}</MenuItem>
                    <MenuItem value="quarter">{t('reports.lastQuarter')}</MenuItem>
                    <MenuItem value="year">{t('reports.lastYear')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={mockData.cardUsageByInstitution} 
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

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t('reports.keyInsights')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.cardStatus')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.cardIssuance')}</Typography>
            <Typography variant="body2" paragraph>• {t('reports.insights.cardUsage')}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardReport;