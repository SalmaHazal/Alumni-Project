import React, { useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import StationsList from './StationsList';

const StationManager = ({
  allFmList,
  favouriteFmList,
  setFavouriteFmList,
  currentStation,
  setCurrentStation,
  currentPlayList,
  setCurrentPlayList,
  currentPlayListType,
  setCurrentPlayListType,
}) => {
  // Ref
  const allButtonRef = useRef(null);
  const favButtonRef = useRef(null);

  // Handlers
  const showAllStationsHandler = () => {
    favButtonRef.current.classList.remove('active-button');
    allButtonRef.current.classList.add('active-button');
    setCurrentPlayList(allFmList);
    setCurrentPlayListType('all');
  };

  const showFavStationsHandler = () => {
    allButtonRef.current.classList.remove('active-button');
    favButtonRef.current.classList.add('active-button');
    setCurrentPlayList(favouriteFmList);
    setCurrentPlayListType('fav');
  };

  // Use theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '17%',
        padding: '0.5rem',
        textAlign: 'center',
        height: '870px',
        overflowY: 'scroll',
        backgroundColor: theme.palette.sidebar.background, // Sidebar background color
        position: 'absolute', // Positioning the box
        right: 0, // Aligning it to the right
        top: 0, // Aligning it to the top
        marginTop: '70px',
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'Pacifico, cursive' }}>
          Alumni<span style={{ color: '#36C2CE' }}>radio</span>
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
          <Button
            ref={allButtonRef}
            onClick={showAllStationsHandler}
            variant="contained"
            sx={{
              width: '45%',
              fontSize: '0.75em',
              borderRadius: '0.75rem',
              height: '1.5rem',
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                backgroundColor: '#db602c',
              },
            }}
          >
            ALL
          </Button>
          <Button
            ref={favButtonRef}
            onClick={showFavStationsHandler}
            variant="contained"
            sx={{
              width: '45%',
              fontSize: '0.75em',
              borderRadius: '0.75rem',
              height: '1.5rem',
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                backgroundColor: '#db602c',
              },
            }}
          >
            FAV
          </Button>
        </Box>
      </Box>

      <StationsList
        allFmList={allFmList}
        favouriteFmList={favouriteFmList}
        setFavouriteFmList={setFavouriteFmList}
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
        currentPlayList={currentPlayList}
        setCurrentPlayList={setCurrentPlayList}
      />
    </Box>
  );
};

export default StationManager;
