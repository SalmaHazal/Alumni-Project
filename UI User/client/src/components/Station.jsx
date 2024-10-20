import React, { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyStar } from '@fortawesome/free-regular-svg-icons';

const Station = ({
  station,
  favouriteFmList,
  setFavouriteFmList,
  allFmList,
  currentPlayList,
  setCurrentPlayList,
  currentStation,
  setCurrentStation,
}) => {
  // Handlers
  const removeFromFavHandler = () => {
    setFavouriteFmList(favouriteFmList.filter((favStation) => favStation.id !== station.id));
  };

  const addToFavHandler = () => {
    setFavouriteFmList([...favouriteFmList, station]);
  };

  const selectCurrentlySelectedStationHandler = () => {
    setCurrentStation(station);
  };

  // Use effect hook
  useEffect(() => {
    if (JSON.stringify(allFmList) !== JSON.stringify(currentPlayList)) {
      setCurrentPlayList(favouriteFmList);
    }
    localStorage.setItem('favouriteFMList', JSON.stringify(favouriteFmList));
  }, [favouriteFmList]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '8px',
        marginTop: '1rem',
        backgroundColor: currentStation.id === station.id ? '#0F1B41' : 'transparent', // Active box style
      }}
    >
      <Box
        onClick={selectCurrentlySelectedStationHandler}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Box
          component="img"
          src={station.logo}
          alt={`Logo of ${station.name}`}
          sx={{
            width: '2.5rem',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            paddingLeft: '0.5rem',
            fontSize: '1rem',
            fontWeight: 400,
          }}
        >
          {station.name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {favouriteFmList.some((favStation) => favStation.id === station.id) ? (
          <IconButton onClick={removeFromFavHandler} sx={{ color: '#f54b00' }}>
            <FontAwesomeIcon icon={solidStar} size="1x" />
          </IconButton>
        ) : (
          <IconButton onClick={addToFavHandler}>
            <FontAwesomeIcon icon={emptyStar} size="1x" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Station;
