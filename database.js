import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "VehicleRescue";
const database_version = "1.0";
const database_displayname = "SQLite MyDatabase";
const database_size = 200000;

let db;

export const getDBConnection = async () => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );

  return db;
};

export const closeDBConnection = async () => {
  if (db) {
    await db.close();
    db = null;
  }
};
