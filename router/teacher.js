const { TeacherController } = require('../controller');
const isLogged = require('../middlewares/is_logged');
const isAuth = require('../middlewares/is_auth');

var router = require("express").Router();

router.get("/teachers", isLogged, isAuth, TeacherController.find);

router.post("/teachers", isLogged, isAuth, TeacherController.create);

router.delete("/teachers/:id", isLogged, isAuth, TeacherController.destroy);

router.put("/teachers/:id", isLogged, isAuth, TeacherController.update);

router.get("/teachers/:id", isLogged, isAuth, TeacherController.findOne);

module.exports = router;
