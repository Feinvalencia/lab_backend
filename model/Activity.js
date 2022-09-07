const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

var EventSchema = new Schema({ title: String, start: Date, end: Date, summary: String });

/**
 * @swagger
 *
 * definitions:
 *   ActivitySchema:
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
const ActivitySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    initialTime: {
      type: Date
    },
    endTime: {
      type: Date
    },
    capacity: {
      type: Number
    },
    image: {
      type: String
    },
    events: [EventSchema]
  },
  {
    timestamps: true
  }
);

ActivitySchema.plugin(mongoosePaginate);

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
