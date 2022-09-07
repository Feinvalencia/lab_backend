const { ActivityController, RewardController } = require("../controller");
var router = require("express").Router();
//Create a Activity
router.post("/activities", ActivityController.create);
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
router.get("/activities", ActivityController.find);
//Find a Activity
router.get("/activities/:id", ActivityController.findOne);
//Update a Activity by Id
router.put("/activities/:id", ActivityController.update);
//Delete a Activity by Id
router.delete("/activities/:id", ActivityController.destroy);
//Update a Events by Id
router.put("/activities/:id/events", ActivityController.updateEventsActivity);

//Find all rewards
router.get("/rewards", RewardController.find);
//Create a reward
router.post("/rewards", RewardController.create);
//Delete a reward
router.delete("/rewards/:id", RewardController.destroy);

module.exports = router;
