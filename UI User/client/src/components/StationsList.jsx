import React from 'react';
import Station from './Station';
import { Box, Typography } from '@mui/material';

const StationsList = ({
  allFmList,
  favouriteFmList,
  setFavouriteFmList,
  currentStation,
  setCurrentStation,
  searchKey,
  setSearchKey,
  currentPlayList,
  setCurrentPlayList,
}) => {
  return (
    <Box>
      {currentPlayList.map((station) => (
        <Station
          key={station.id}
          station={station}
          allFmList={allFmList}
          favouriteFmList={favouriteFmList}
          setFavouriteFmList={setFavouriteFmList}
          currentPlayList={currentPlayList}
          setCurrentPlayList={setCurrentPlayList}
          setCurrentStation={setCurrentStation}
          currentStation={currentStation}
        />
      ))}
      {currentPlayList.length === 0 && (
        <Typography variant="h3" sx={{ fontSize: '1rem', margin: '1rem' }}>
          No station in this playlist.
        </Typography>
      )}
    </Box>
  );
};

export default StationsList;
