import React, { useEffect } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';

const PlayManager = ({
  allFmList,
  favouriteFmList,
  setFavouriteFmList,
  currentStation,
  setCurrentStation,
  currentPlayList,
  setCurrentPlayList,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .catch((error) => {
            console.log(error);
            audioRef.current.pause();
          });
      }
    }

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentStation.name,
        artwork: [{ src: currentStation.logo, type: 'image/png' }],
      });

      navigator.mediaSession.setActionHandler('previoustrack', previousStationHandler);
      navigator.mediaSession.setActionHandler('nexttrack', nextStationHandler);
      navigator.mediaSession.setActionHandler('pause', () => {
        setIsPlaying(false);
        audioRef.current.pause();
      });
      navigator.mediaSession.setActionHandler('play', () => {
        setIsPlaying(true);
        audioRef.current.currentTime = 0;
        audioRef.current.load();
        audioRef.current.play();
      });
    }
  }, [currentStation, isPlaying]);


  const previousStationHandler = () => {
    const id = currentPlayList.findIndex((station) => station.id === currentStation.id);
    const prevId = id - 1;
    setCurrentStation(id > 0 ? currentPlayList[prevId] : currentPlayList[currentPlayList.length - 1]);
  };

  const nextStationHandler = () => {
    const id = currentPlayList.findIndex((station) => station.id === currentStation.id);
    const nextId = id + 1;
    setCurrentStation(id < currentPlayList.length - 1 ? currentPlayList[nextId] : currentPlayList[0]);
  };

  const playPauseHandler = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      audioRef.current.play();
    }
  };


  const theme = useTheme();
  const { palette } = theme;

  return (
    <Box
      sx={{
        width: '75%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.background.default, // Background color from theme
      }}
    >
      <Box
        sx={{
          height: '85%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          component="img"
          id="spinning-circle"
          src={currentStation.logo}
          alt={currentStation.name}
          sx={{ width: '40%', borderRadius: '50%', marginBottom: '30px', marginLeft: '10%' }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: palette.background.alt, // Use alternate background color for the control panel
          height: '10%',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '50%',
          marginLeft: '30%',
          marginRight: 'auto',
          marginBottom: '30%',
          borderRadius: '8px', // Optional: Add some border-radius for better aesthetics
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={currentStation.logo} alt={currentStation.name} sx={{ height: '50px', width: '50px', borderRadius: '10px' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              marginLeft: '1rem',
            }}
          >
            {currentStation.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={previousStationHandler}>
            <FontAwesomeIcon icon={faChevronCircleLeft} size={'2x'} />
          </IconButton>
          <Box sx={{ width: '1rem' }} />
          <IconButton onClick={playPauseHandler}>
            {isPlaying ? (
              <FontAwesomeIcon icon={faPauseCircle} size={'2x'} />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} size={'2x'} />
            )}
          </IconButton>
          <Box sx={{ width: '1rem' }} />
          <IconButton onClick={nextStationHandler}>
            <FontAwesomeIcon icon={faChevronCircleRight} size={'2x'} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayManager;
