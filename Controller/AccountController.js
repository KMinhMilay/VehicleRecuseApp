import AccountModel from "../Model/AccountModel";

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