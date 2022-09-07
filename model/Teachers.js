const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

/**
 * @swagger
 * definitions:
 *   TeacherSchema:
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
const TeacherSchema = new Schema(
  {
    cedula: {
      type: String,
      unique: true,
      required: [true, "Cedula is required"],
    },
    firstName: {
      type: String,
      required: [true, "Name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    dateOfBirth: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

TeacherSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

TeacherSchema.index({ cedula: 1 });

TeacherSchema.plugin(mongoosePaginate);

const Teacher = mongoose.model("Teachers", TeacherSchema);

module.exports = Teacher;




