const { CategoryController } = require("../controller");
var router = require("express").Router();
//Create a Activity
router.get("/categories", CategoryController.find);
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

module.exports = router;
