import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import CitizenList from './components/citizens/CitizenList';
import CitizenForm from './components/citizens/CitizenForm';
import CitizenDetail from './components/citizens/CitizenDetail';
import theme from './theme/theme';
import './App.css';

// Placeholder components for routes (to be developed)
const CardManagement = () => <div>Card Management Page</div>;
const Institutions = () => <div>Institutions Page</div>;
const Reports = () => <div>Reports Page</div>;
const Support = () => <div>Support Page</div>;

function App() {
  // Mock authentication state (will be replaced with actual auth)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isAuthenticated ? (
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/citizens" element={<CitizenList />} />
              <Route path="/citizens/new" element={<CitizenForm />} />
              <Route path="/citizens/:id" element={<CitizenDetail />} />
              <Route path="/citizens/:id/edit" element={<CitizenForm />} />
              <Route path="/cards" element={<CardManagement />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
