import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const newSongs = songs.map((newSong) => {
      if (newSong.id === song.id) {
        return { ...newSong, active: true };
      } else {
        return { ...newSong, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={() => {
        songSelectHandler();
        setLibraryStatus(false);
      }}
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
        song.active
          ? "bg-blue-100 border-l-4 border-blue-500"
          : "hover:bg-gray-100"
      }`}
    >
      {/* Song Cover Image */}
      <img
        src={`http://localhost:3001/covers/${song.cover}`}
        className="w-16 h-16 rounded-lg object-cover"
      />

      {/* Song Info */}
      <div className="ml-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{song.songName}</h3>
        <h4 className="text-sm text-gray-600">{song.artistName}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
