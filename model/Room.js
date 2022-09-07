const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");
const { times } = require("underscore");


/**
 * @swagger
 *
 * definitions:
 *   RoomSchema:
 *     type: object
 *     required:
 *       - message
 *       - timestamps
 *     properties:
 *       message:
 *         type: string
 *       timestamps:
 *         type: string
 */
const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    initialTime: {
      type: String
    },
    endTime: {
      type: String
    },
    capacity: {
      type: Number
    },
      airConditioner: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

RoomSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

RoomSchema.index({name:1});

RoomSchema.plugin(mongoosePaginate);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
