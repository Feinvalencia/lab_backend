const { EventController } = require("../controller");
var router = require("express").Router();
//Create a Activity
router.post("/events", EventController.create);
//Find many Activity
/**
 * @swagger
 * /activities:
 *   get:
 *     tags:
 *       - Activities
 *     description: Returns all Activities
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of activities
 *         schema:
 *           $ref: '#/definitions/ActivitySchema'
 *       500:
 *         description: SERVER ERROR
 */
router.get("/events", EventController.find);
//Find a Activity
router.get("/events/:id", EventController.findAllByCategory);
router.delete("/events/:idEvent", EventController.destroy);

module.exports = router;
