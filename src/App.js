import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://teuteuf-dashboard-assets.pages.dev/data/worldle/games/2025/2025-01-09.json`); // Write logic for automatic checking of date
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  });

  return (
    <Typography></Typography>
  );
}

export default App;
