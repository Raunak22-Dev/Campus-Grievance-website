import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: '',
    dob: '',
    gender: '',
    year: '',
    department: '',
    email: '',
    Id: '',
  });

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const updateUser = (newDetails) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newDetails };
      // Save updated user data to localStorage
      localStorage.setItem('userDetails', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
