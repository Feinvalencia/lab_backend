const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const RewardSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        trainingCount: {
            type: Number,
            required: true
        }
    }
);

RewardSchema.plugin(mongoosePaginate);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;