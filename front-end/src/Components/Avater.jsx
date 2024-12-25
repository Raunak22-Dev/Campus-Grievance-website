import React, { useState, useRef } from "react";
import { profile } from '../assets/icons'; // Assuming profile is the default image

const AvatarUpload = () => {
  const [file, setFile] = useState(null); // Store selected file
  const [preview, setPreview] = useState(""); // Image preview URL
  const [profilePic, setProfilePic] = useState(profile); // Initial profile picture is the default image
  const fileInputRef = useRef(null); // Reference to file input for programmatic clicking

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Immediately set profilePic to the selected image (to directly show it)
    setProfilePic(objectUrl);
  };

  const handleSave = () => {
    alert("Profile picture saved successfully!");
    // Handle saving functionality (e.g., API upload)
  };

  const handleEdit = () => {
    // Trigger file input click to choose a new profile picture
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center py-8 space-y-4">
      <h2 className="text-lg   font-semibold text-gray-800">Profile Picture</h2>

      {/* Display the current profile picture if it exists */}
      <div className="flex flex-col items-center">
        <img
          src={profilePic}
          alt="Profile"
          className="w-48 h-48 object-cover rounded-full border-4 border-gray-200"
        />
      </div>

      {/* File input for profile picture, hidden for programmatic clicking */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden" // Hide the actual input
        ref={fileInputRef} // Reference for programmatic control
      />

      {/* Edit or Save button */}
      <div className="mt-6 space-x-4">
        {profilePic && profilePic !== profile ? (
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Save Profile Picture
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Edit Profile Picture
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
