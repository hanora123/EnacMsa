import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {t('footer.rights', { year: currentYear })}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
            <Link href="#" color="text.secondary" underline="hover">
              {t('footer.privacy')}
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              {t('footer.terms')}
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              {t('footer.contact')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;