const { Router } = require("express");
const router = Router();
const UsersController = require("../controllers/UsersController");

router.post("/login", UsersController.login);

router.post("/signUp", UsersController.signUp);

module.exports = router