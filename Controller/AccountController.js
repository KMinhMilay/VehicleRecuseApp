import * as AccountModel from '../Model/AccountModel'


export const getAccountById = async (idUser) => {
  try {
    const listRequests = await AccountModel.getAccountById(idUser);
    console.log('Lấy tài khoản theo id thành công');
    return listRequests;
  } catch (error) {
    console.error('Có lỗi khi lấy tài khoản:', error);
  }
}

export const updateAccount = async (idUser) => {
  try {
    const listRequests = await AccountModel.updateAccount(idUser);
    console.log('cập nhật thành công');
    return listRequests;
  } catch (error) {
    console.error('Có lỗi khi lấy yêu cầu:', error);
  }
}

export const updateAccountNoPassWord = async (idUser) => {
  try {
    const listRequests = await AccountModel.updateAccountNoPassWord(idUser);
    console.log('cập nhật thành công');
    return listRequests;
  } catch (error) {
    console.error('Có lỗi khi lấy yêu cầu:', error);
  }
}



class AccountController {
    constructor(databaseName) {
      this.model = new AccountModel(databaseName);
    }
  
    createAccount(username, fullname, phone_number, birthdate, email, password, role, current_longitude, current_latitude) {
      return this.model.createAccount(username, fullname, phone_number, birthdate, email, password, role, current_longitude, current_latitude);
    }
  
    getAccountById(id) {
      return this.model.getAccountById(id)
    }

    updateAccount(accountData) {
      return this.model.updateAccount(accountData)
    }
  }
  
  export default AccountController;