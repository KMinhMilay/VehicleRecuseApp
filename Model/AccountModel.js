import SQLite from 'react-native-sqlite-storage';

class AccountModel {
  constructor(databaseName) {
    this.db = SQLite.openDatabase({ name: databaseName, location: 'default' });
  }

  createAccount(username, fullname, phone_number, birthdate, email, password, role, current_longitude, current_latitude) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO Accounts (username, fullname, phone_number, birthdate, email, password, role, current_longitude, current_latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [username, fullname, phone_number, birthdate, email, password, role, current_longitude, current_latitude],
          (_, { insertId }) => {
            resolve(insertId);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  }

  getAccountById(id) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Accounts WHERE id = ?', 
          [id],
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

  updateAccount(accountData) {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          'UPDATE Accounts SET fullname = ?, phone_number = ?, birthdate = ?, email = ?, password = ? WHERE id = ?',
          [
            accountData.fullname,
            accountData.phone_number,
            accountData.birthdate,
            accountData.email,
            accountData.password,
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
}

export default AccountModel;