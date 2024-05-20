import { getDBConnection } from '../database';
import md5 from 'md5';

export const getAccountById = async (idUser) => {
  const db = await getDBConnection();
  const query = 'SELECT * FROM Accounts WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query, 
        [idUser],
        (_, { rows }) => {
          resolve(rows.item(0));
        },
        error => {
          reject(error);
        }
      );
    });
  });
}

export const updateAccount = async (accountData) => {
  const db = await getDBConnection();

  const hashedPassword = md5(accountData.password); 

  const query = 'UPDATE Accounts SET fullname = ?, phone_number = ?, birthdate = ?, email = ?, password = ? WHERE id = ?'
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [
          accountData.fullname,
          accountData.phone_number,
          accountData.birthdate,
          accountData.email,
          hashedPassword,
          accountData.id
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true); // cập nhật thành công
          } else {
            resolve(false); // cập nhật thất bại
          }
        },
        error => {
          reject(error); // có lỗi trong quá trình cập nhật
        }
      );
    });
  });
}

export const updateAccountNoPassWord = async (accountData) => {
  const db = await getDBConnection();
  const query = 'UPDATE Accounts SET fullname = ?, phone_number = ?, birthdate = ?, email = ? WHERE id = ?'
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [
          accountData.fullname,
          accountData.phone_number,
          accountData.birthdate,
          accountData.email,
          accountData.id
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true); // cập nhật thành công
          } else {
            resolve(false); // cập nhật thất bại
          }
        },
        error => {
          reject(error); // có lỗi trong quá trình cập nhật
        }
      );
    });
  });
}