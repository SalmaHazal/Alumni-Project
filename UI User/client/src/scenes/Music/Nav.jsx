import React from "react";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoCloudUpload } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";

const Nav = ({ libraryStatus, setLibraryStatus, uploadStatus, setUploadStatus }) => {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-lg">
      {/* Title with icon */}
      <h1 className="text-white text-2xl font-bold flex items-center gap-2">
        Alumni's Playlist
        <BiSolidPlaylist />
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setLibraryStatus(!libraryStatus)}
          className="bg-white bold text-blue-600 px-6 py-2 font-bold rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Library
          <MdLibraryMusic size="20px" />
        </button>
        <button
          onClick={() => setUploadStatus(!uploadStatus)}
          className="bg-white text-blue-600 px-6 py-2 font-bold rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Upload a Song
          <IoCloudUpload size='20px' />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
