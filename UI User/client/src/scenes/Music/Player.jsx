import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";

const Player = ({
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  songInfo,
  setSongs,
  songs,
  setSongInfo,
}) => {
    const { palette } = useTheme();
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((newSong) => {
      if (newSong.id === nextPrev.id) {
        return {
          ...newSong,
          active: true,
        };
      } else {
        return {
          ...newSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    function handleKey(event) {
      if (event.key === ' ') {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(!isPlaying);
        } else {
          audioRef.current.play();
          setIsPlaying(!isPlaying);
        }
      }
    }

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className={`player flex flex-col items-center justify-center p-3 shadow-lg ${palette.mode === "dark" ? "bg-[#1a1a1a]" : "bg-white"}`} >
      {/* Time Control */}
      <div className="time-control flex items-center justify-between w-full">
        <p className="text-blue-700 font-semibold mt-4 text-sm">{getTime(songInfo.currentTime)}</p>
        <div
          className="track w-full mx-4 h-2 rounded-lg relative"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
            className="w-full"
          />
          <div
            style={trackAnim}
            className="animate-track h-2 absolute top-0 left-0 bg-blue-200 rounded-lg"
          ></div>
        </div>
        <p className="text-blue-700 mt-4 font-semibold text-sm">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>

      {/* Play Control */}
      <div className="play-control flex items-center justify-center mt-4 space-x-6">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="text-blue-700 cursor-pointer transition-transform transform hover:scale-110"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="text-blue-700 cursor-pointer transition-transform transform hover:scale-110"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="text-blue-700 cursor-pointer transition-transform transform hover:scale-110"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
