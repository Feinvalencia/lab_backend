const { RoomController } = require("../controller");
const isLogged = require('../middlewares/is_logged');
const isAuth = require('../middlewares/is_auth');

var router = require("express").Router();

router.get("/rooms", isLogged, isAuth, RoomController.find);

router.post("/rooms", isLogged, isAuth, RoomController.create);

router.delete("/rooms/:id",  isLogged, isAuth, RoomController.destroy);

router.put("/rooms/:id",  isLogged, isAuth, RoomController.update);

router.get("/rooms/:id", isLogged, isAuth, RoomController.findOne);

module.exports = router;
