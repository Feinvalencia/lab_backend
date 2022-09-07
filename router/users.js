const { UserController } = require("../controller");
const { body } = require('express-validator/check');
const isLogged = require('../middlewares/is_logged');
const isAuth = require('../middlewares/is_auth');

var router = require("express").Router();

router.get("/users", isLogged, isAuth, UserController.find);

router.post("/users",
[
    body('email')
      .isEmail()
      .withMessage('Enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must e alphanumeric and have at least 6 characters.')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric and have at least 6 characters.')
  ]
, UserController.register);

router.delete("/users/:id", isLogged, isAuth, UserController.destroy);

router.put("/users/:id", isLogged, isAuth, UserController.update);

router.get("/users/:id", isLogged, isAuth, UserController.findOne);

router.get("/users_confirmation/:token", UserController.confirm);

router.post("/users_reset", UserController.resetPassword);

router.post("/users_reset/:token", 
[
  body('password')
  .trim()
  .isLength({ min: 6 })
      .withMessage('Password must e alphanumeric and have at least 6 characters.')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric and have at least 6 characters.')
]   
, UserController.createNewPassword);

module.exports = router;
