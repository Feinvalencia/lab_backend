const { Reward } = require("../model");

module.exports = {
    create: async (req, res, next) => {
        try {
            const { reward } = req.body;

            //Create new post
            const newReward = await new Reward(reward).save();

            //Send the response
            res.send({
                data: {
                    reward: newReward
                },
                status: {
                    code: 200,
                    message: "Premio creado con éxito",
                    succeeded: true
                },
            });
        } catch (err) {
            //Send the error
            next(err);
        }
    },

    destroy: async (req, res, next) => {
        try {
          const { id } = req.params;
          const { reward } = req.body;
    
          //Find a reward by id and remove it
          const theReward = await Reward.findByIdAndRemove(id);
    
          //Send the response
          res.send({
            status: {
              code: 200,
              message: "Operation handle correctly",
              succeeded: true,
            },
          });
        } catch (err) {
          //Send the error
          next(err);
        }
      },

    find: async (req, res, next) => {
        try {
            //Find, sort and paginate the Reward
            const theRewards = await Reward.find({});

            //Send the response
            res.send({
                data: {
                    rewards: theRewards
                },
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            });
        } catch (err) {
            //Send the error
            next(err);
        }
    }
};