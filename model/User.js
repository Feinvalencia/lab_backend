const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

var uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} no es un role válido"
};

let Schema = mongoose.Schema;

/**
 * @swagger
 *
 * definitions:
 *   UserSchema:
 *     type: object
 *     required:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
let UserSchema = new Schema({
  name: {
    type: String,
    required: [
      true,
      "Name is required"
    ]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    default: "USER",
    required: [true, "Role is required (ADMIN or USER)"],
    enum: rolesValidos
  },
  blocked: {
    type: Boolean,
    default: true
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  }
});

// elimina la key password del objeto que retorna al momento de crear un usuario
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  console.log("Usuario: "+ userObject.toString());
  console.log("user: "+ user.toString());

  delete userObject.password;

  return userObject;
};

UserSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

UserSchema.index({name:1});

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);

module.exports = User;


