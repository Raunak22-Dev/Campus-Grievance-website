import React, { createContext, useState, useContext } from 'react';

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

  const updateUser = (newDetails) => {
    setUser((prevUser) => ({ ...prevUser, ...newDetails }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
