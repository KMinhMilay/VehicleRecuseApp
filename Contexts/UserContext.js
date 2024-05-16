import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [id, setId] = useState(0);
  const [username, setUserName] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [current_longitude, setCurrentLongitude] = useState(0);
  const [current_latitude, setCurrentLatitude] = useState(0);

  const updateUser = (userData) => {
    setId(userData.id || 0);
    setUserName(userData.username || null);
    setFullname(userData.fullname || null);
    setPhoneNumber(userData.phone_number || null);
    setBirthdate(userData.birthdate || null);
    setEmail(userData.email || null);
    setRole(userData.role || null);
  };
  const clearUserData = () => {
    setId(0);
    setUserName(null);
    setFullname(null);
    setPhoneNumber(null);
    setBirthdate(null);
    setEmail(null);
    setRole(null);
  };


  const showUser = () => {
    console.log(id, username, fullname, phone_number, birthdate, email, role, "This is console log");
  }

  return (
    <UserContext.Provider
      value={{
        id,
        username,
        fullname,
        phone_number,
        birthdate,
        email,
        role,
        current_longitude,
        current_latitude,
        updateUser,
        showUser,
        clearUserData,
        setCurrentLongitude,
        setCurrentLatitude,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};