const { RewardController } = require("../controller");
var router = require("express").Router();

//Find all rewards
router.get("/rewards", RewardController.find);
//Create a reward
router.post("/rewards", RewardController.create);
//Delete a reward
router.delete("/rewards/:id", RewardController.destroy);

module.exports = router;
