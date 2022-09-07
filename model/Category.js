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
const CategorySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

CategorySchema.plugin(mongoosePaginate);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
