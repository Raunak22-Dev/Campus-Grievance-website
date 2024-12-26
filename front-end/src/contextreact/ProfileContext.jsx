import React, { createContext, useState, useContext } from 'react';
import { profile } from '../assets/icons';

// 1. Create a context for managing the profile state.
const ProfileContext = createContext();

// 2. Create a Provider component for managing the state and updating the avatar.
export const ProfileProvider = ({ children }) => {
  // Setting an initial avatar (could be a default image URL).
  const [avatar, setAvatar] = useState(profile); 

  // Function to update the avatar.
  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar); // This will be the new image URL after user upload.
  };

  return (
    <ProfileContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
};

// 3. Create a custom hook to easily consume the context.
export const useProfile = () => {
  return useContext(ProfileContext); // Get the current avatar state and update function.
};

// it is use in App.jsx,Avater ,ProfileDropDown