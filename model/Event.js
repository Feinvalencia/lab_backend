const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

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
const EventSchema = new Schema(
  {
    idEvent: {
      type: String
    },
    title: {
      type: String
    },
    date: {
      type: String
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    },
    professional: {
      type: String
    },
    notes: {
      type: String
    },
    summary: {
      type: String
    },
    idCategory: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

EventSchema.plugin(mongoosePaginate);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
