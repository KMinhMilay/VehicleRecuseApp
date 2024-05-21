import React, {createContext, useState} from 'react';

export const UserContext = createContext();
import SQLite from 'react-native-sqlite-storage';

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

  const db = SQLite.openDatabase(
    {
        name: 'VehicleRescue',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
  );

  const renewEngineerLocation = (coordinates) => {
    setCurrentLongitude(coordinates.current_longitude);
    setCurrentLatitude(coordinates.current_latitude);
  }

  const updateUser = (userData) => {
    setId(userData.id || 0);
    setUserName(userData.username || null);
    setFullname(userData.fullname || null);
    setPhoneNumber(userData.phone_number || null);
    setBirthdate(userData.birthdate || null);
    setEmail(userData.email || null);
    setRole(userData.role || null);
    setCurrentLongitude(userData.current_longitude || 0);
    setCurrentLatitude(userData.current_latitude || 0);
  };
  const clearUserData = () => {
    setId(0);
    setUserName(null);
    setFullname(null);
    setPhoneNumber(null);
    setBirthdate(null);
    setEmail(null);
    setRole(null);
    setCurrentLongitude(0);
    setCurrentLatitude(0);
  };

  const userData = {
    id,
    username,
    fullname,
    phone_number,
    birthdate,
    email,
    role,
    current_longitude,
    current_latitude,
  };

  const showUser = () => {
    console.log("User data received: ", id, username, fullname, phone_number, birthdate, email, role, current_longitude, current_latitude);
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
        userData,
        renewEngineerLocation,
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