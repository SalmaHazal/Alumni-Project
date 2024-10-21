import React, { useState, useRef } from 'react';
import StationManager from '../../components/StationManager';
import PlayManager from '../../components/PlayManager';
import { Box } from '@mui/material';
import GlobalStyle from '../../components/GlobalStyles';
import Navbar from '../navbar/Navbar';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useNavigate } from "react-router-dom";
import LamaTube from "../../../public/assets/logo.png";
import Divider from "../widgets/Divider";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import songsList from '../../data';

function Radio() {
  // Creating state
  const [allFmList, setAllFmList] = useState(songsList);
  const [favouriteFmList, setFavouriteFmList] = useState(
    JSON.parse(localStorage.getItem('favouriteFMList')) || []
  );
  const [currentPlayList, setCurrentPlayList] = useState(allFmList);
  const [currentPlayListType, setCurrentPlayListType] = useState('all');
  const [currentStation, setCurrentStation] = useState(currentPlayList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio ref
  const audioRef = useRef(null);
  const theme = useTheme();
  const { palette } = theme;
  const navigate = useNavigate();

  return (
    <>
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row', 
          height: '100vh' ,
          marginTop: "80px"
        }}
      >
        <StationManager
          allFmList={allFmList}
          favouriteFmList={favouriteFmList}
          setFavouriteFmList={setFavouriteFmList}
          currentStation={currentStation}
          setCurrentStation={setCurrentStation}
          currentPlayList={currentPlayList}
          setCurrentPlayList={setCurrentPlayList}
          currentPlayListType={currentPlayListType}
          setCurrentPlayListType={setCurrentPlayListType}
        />
        <PlayManager
          allFmList={allFmList}
          favouriteFmList={favouriteFmList}
          setFavouriteFmList={setFavouriteFmList}
          currentStation={currentStation}
          setCurrentStation={setCurrentStation}
          currentPlayList={currentPlayList}
          setCurrentPlayList={setCurrentPlayList}
          currentPlayListType={currentPlayListType}
          setCurrentPlayListType={setCurrentPlayListType}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      </Box>
      <audio ref={audioRef} src={currentStation.audio}></audio>
    </>
  );
}

export default Radio;
