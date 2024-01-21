const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const usersList = JSON.parse(fs.readFileSync("src/data/users.json"));

class UsersController {
  signUp(req, res) {
    try {
      const { email, password } = req.body;

      const userByEmail = usersList.find((user) => user.email === email);

      if (!!userByEmail.length) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "E-mail já está cadastrado",
        });
      }

      fs.writeFileSync(
        "src/data/users.json",
        JSON.stringfy([...usersList, { email, password }])
      );

      return res.status(StatusCodes.OK).json({
        message: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Erro na função de cadastro",
      });
    }
  }

  login(req, res) {
    try {
      const { email, password } = req.body;

      const userByEmail = usersList.find((user) => user.email === email);

      if (!userByEmail) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "E-mail incorreto",
        });
      }

      if (userByEmail.password !== password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Senha incorreta",
        });
      }

      const data = {
        user: userByEmail.email,
        token: jwt.sign({ userByEmail }, "my_secret_key"),
      };

      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Erro na função de login",
      });
    }
  }
}

module.exports = new UsersController();
