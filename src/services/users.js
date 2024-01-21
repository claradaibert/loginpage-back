const fs = require("fs");

class UsersService {
  getAllUsers() {
    const users = JSON.parse(fs.readFileSync("src/data/users.json"));
    return users;
  }

  addNewUser(newUser) {
    const currentUsers = this.getAllUsers();

    fs.writeFileSync(
      "src/data/users.json",
      JSON.stringfy([...currentUsers, newUser])
    );
  }
}

module.exports = new UsersService();
