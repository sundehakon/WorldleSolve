import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import PublicIcon from '@mui/icons-material/Public';

function App() {
  const [countryCodeData, setCountryCodeData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryAnswer, setCountryAnswer] = useState(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryCodeResponse = await axios.get(`https://teuteuf-dashboard-assets.pages.dev/data/worldle/games/2025/2025-01-09.json`); // Write logic for automatic checking of date
        setCountryCodeData(countryCodeResponse.data);

        const countriesResponse = await axios.get('https://teuteuf-dashboard-assets.pages.dev/data/common/countries.json');
        setCountries(countriesResponse.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (countryCodeData && countries.length > 0) {
      const countryCode = countryCodeData.countryCode;
      const country = countries.find(c => c.code === countryCode);
      if (country) {
        setCountryAnswer(country.name)
      }
    }
  }, [countryCodeData, countries]);

  return (
    <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <Paper sx={{ height: 300, width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }} elevation={3}>
        <PublicIcon />
        <Typography variant='h4'>Worldle Answer</Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>9.1.2025</Typography>
        {reveal === false && <Button variant='outlined' onClick={() => setReveal(true)}>Reveal</Button>}
        {reveal === true && <Typography>{countryAnswer || 'Loading...'}</Typography>}
      </Paper>
    </Box>
  );
}

export default App;
