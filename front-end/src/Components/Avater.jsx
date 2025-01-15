import React, { useState, useRef } from "react";
import { useProfile } from "../contextreact/ProfileContext";

const AvatarUpload = () => {
  const [file, setFile] = useState(null); // Store selected file
  const [preview, setPreview] = useState(""); // Temporary preview for new file
  const [isSaved, setIsSaved] = useState(true); // Track save status
  const { avatar, updateAvatar } = useProfile(); // Use shared avatar from context
  const fileInputRef = useRef(null); // Reference for file input

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setIsSaved(false); // Mark as unsaved since the picture is updated
  };

  const handleSave = () => {
    if (file) {
      updateAvatar(preview); // Update avatar in the global state
      setIsSaved(true); // Mark as saved
     
    }
  };

  const handleEdit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  return (
    <div className="flex flex-col items-center py-8 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Profile Picture</h2>

      {/* Display the current or previewed profile picture */}
      <div className="flex flex-col items-center">
        <img
          src={isSaved ? avatar : preview}
          alt="Profile"
          className="w-48 h-48 object-cover rounded-full border-4 border-gray-200"
        />
      </div>

      {/* File input for profile picture, hidden for programmatic clicking */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        ref={fileInputRef}
      />

      {/* Conditional rendering of Edit and Save buttons */}
      <div className="mt-6 space-x-4">
        {isSaved ? (
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Edit Profile Picture
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Save Profile Picture
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
