import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import CitizenList from './components/citizens/CitizenList';
import CitizenForm from './components/citizens/CitizenForm';
import CitizenDetail from './components/citizens/CitizenDetail';
import { CardList, CardDetail, CardIssue } from './components/cards';
import { InstitutionList, InstitutionDetail, InstitutionForm } from './components/institutions';
import { Reports } from './components/reports'; // استيراد مكون التقارير
import theme from './theme/theme';
import './App.css';
import { useTranslation } from 'react-i18next';

// Placeholder component for Support route (to be developed)
const Support = () => <div>Support Page</div>;

function App() {
  // Mock authentication state (will be replaced with actual auth)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const { i18n } = useTranslation();

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

  // Set up effect to handle RTL/LTR direction
  useEffect(() => {
    // Set document direction based on current language
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isAuthenticated ? (
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/citizens" element={<CitizenList />} />
              <Route path="/citizens/new" element={<CitizenForm />} />
              <Route path="/citizens/:id" element={<CitizenDetail />} />
              <Route path="/citizens/:id/edit" element={<CitizenForm />} />
              <Route path="/cards" element={<CardList />} />
              <Route path="/cards/:id" element={<CardDetail />} />
              <Route path="/cards/issue" element={<CardIssue />} />
              <Route path="/institutions" element={<InstitutionList />} />
              <Route path="/institutions/new" element={<InstitutionForm />} />
              <Route path="/institutions/:id" element={<InstitutionDetail />} />
              <Route path="/institutions/:id/edit" element={<InstitutionForm />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
