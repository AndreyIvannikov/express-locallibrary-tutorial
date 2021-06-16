const express = require("express");
const auth = require("../controllers/userController");

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/cool", (req, res, next) => {
  res.send("ну вы крутой");
});

router.post("/auth", auth.createUser);
router.post("/login", auth.login);
module.exports = router;
