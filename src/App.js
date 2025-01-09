import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import PublicIcon from '@mui/icons-material/Public';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function App() {
  const [countryCodeData, setCountryCodeData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [countryAnswer, setCountryAnswer] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async (date) => {
      try {
        const countryCodeResponse = await axios.get(`https://teuteuf-dashboard-assets.pages.dev/data/worldle/games/2025/${date}.json`);
        setCountryCodeData(countryCodeResponse.data);

        const countriesResponse = await axios.get('https://teuteuf-dashboard-assets.pages.dev/data/common/countries.json');
        setCountries(countriesResponse.data);
        
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false); 
      }
    };

    fetchData(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (countryCodeData && countries.length > 0) {
      const countryCode = countryCodeData.countryCode;
      const country = countries.find(c => c.code === countryCode);
      if (country) {
        setCountryAnswer(country.name); 
      }
    }
  }, [countryCodeData, countries]);

  const changeDate = (direction) => {
    const date = new Date(currentDate);
    if (direction === 'forward') {
      date.setDate(date.getDate() + 1);
    } else if (direction === 'backward') {
      date.setDate(date.getDate() - 1);  
    }
    const formattedDate = date.toISOString().split('T')[0];  
    setCurrentDate(formattedDate);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <Paper sx={{ height: 300, width: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }} elevation={3}>
        <PublicIcon />
        <Typography variant='h4'>Worldle Answer</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => changeDate('backward')} sx={{ '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' }}} disableElevation disableRipple><ArrowBackIosIcon /></Button>
          <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>{currentDate}</Typography>
          <Button onClick={() => changeDate('forward')} sx={{ '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' }}} disableElevation disableRipple><ArrowForwardIosIcon /></Button>
        </Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            {reveal === false && <Button variant='outlined' onClick={() => setReveal(true)}>Reveal</Button>}
            {reveal === true && <Typography>{countryAnswer || 'No Answer Available'}</Typography>}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default App;
