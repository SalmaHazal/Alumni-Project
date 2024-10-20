import React, { useEffect, useRef, useState } from "react";
import Player from "./Player";
import Song from "./Song";
import Library from "./Library";
import Nav from "./Nav";
import UploadSong from "./UploadSong";
import axios from "axios";
import { FaMusic } from "react-icons/fa";
import WidgetWrappe from "../../components/WidgetWrapper";
import { useTheme, useMediaQuery, Box, Typography, Button, IconButton } from "@mui/material";

function Music() {
  const { palette } = useTheme();
  const [songs, setSongs] = useState([
    {
      songName: "No Songs yet",
      artistName: "Upload a song to let the others sing",
      cover: null,
      songFile: null,
    },
  ]);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getSong");
        setSongs(response.data);
        if (response.data.length > 0) {
          setCurrentSong(response.data[0]);
        }
        console.log("Fetched songs:", response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <WidgetWrappe width="90%" marginTop="3px" marginLeft="5%" height="99.5%">
    <Box 
      //className={`App ${libraryStatus ? "library-active" : ""}`} 
      sx={{  display: "flex", flexDirection: "column"  }}
    >
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        uploadStatus={uploadStatus}
        setUploadStatus={setUploadStatus}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <UploadSong
        uploadStatus={uploadStatus}
        setUploadStatus={setUploadStatus}
        setSongs={setSongs}
      />
      
      {songs.length > 0 ? (
        <Song currentSong={currentSong} />
      ) : (
        <Box 
          className="no-songs-available"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center', px: 3, py: 8 }}
        >
          <IconButton sx={{ fontSize: 60, color: palette.primary.main }}>
            <FaMusic />
          </IconButton>
          <Typography 
            variant="h4" 
            sx={{ mb: 2, fontWeight: 'bold', color: palette.mode === "dark" ? palette.common.white : palette.text.primary }}
          >
            No Songs Available
          </Typography>
          <Typography
            sx={{ color: palette.mode === "dark" ? palette.common.white : palette.text.secondary }}
          >
            Upload some music to get started!
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setUploadStatus(true)}
            sx={{ mt: 4 }}
          >
            Upload a Song
          </Button>
        </Box>
      )}
      
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={`http://localhost:3001/songs/${currentSong.songFile}`}
        onEnded={songEndHandler}
      ></audio>
    </Box>
    </WidgetWrappe>
  );
}

export default Music;
