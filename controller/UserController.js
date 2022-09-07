const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const transporter = require('../config/mailer');
const getTokenData = require('../router/jwt_config')

const {
  User
} = require("../model");

module.exports = {
  login: async (req, res, next) => {
    try {
      let {
        email,
        password
      } = req.body;

      let userDB = await User.findOne({
        email
      });
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Invalid user or password"
          }
        });
      }

      if (userDB.blocked) {
        return res.status(401).json({
          ok: false,
          err: {
            message: "User must confirm register in order to login"
          }
        });

      }

      const compareResult = bcrypt.compareSync(password, userDB.password);
      console.log(compareResult);
      if (!compareResult) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Invalid user or password"
          }
        });
      }

      // Genera el token de autenticación
      let token = jwt.sign({
        user: userDB,
      }, process.env.SEED_AUTENTICACION, {
        expiresIn: process.env.CADUCIDAD_TOKEN,
        algorithm: 'HS256'
      });

      res.json({
        ok: true,
        user: userDB,
        token,
      });
    } catch (err) {
      //Send the error
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
      let body = req.body;

      let {
        name,
        email,
        password,
        role
      } = body;

      let newUser = new User({
        name,
        email,
        password,
        role
      });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).send({
          data: {
            user: newUser
          },
          status: {
            code: 400,
            message: errors.array()[0],
            succeeded: false
          }
        });
      }

      await newUser.save();

      let token = jwt.sign(
        {
          user: newUser
        },
        process.env.SEED_AUTENTICACION,
        {
          algorithm: "HS256"
        }
      );
      const verificationLink = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/public/users_confirmation/${token}`;
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Gym Api" <gym-api@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Confirm your register", // Subject line
        html: `
          <b> Click on the following link to complete the process: </b>
          <a href="${verificationLink}"> ${verificationLink} </a>
          `// html body
      });
      //Send the response
      res.send({
        data: {
          user: newUser,
          token: token
        },
        status: {
          code: 200,
          message: "User successfully registered",
          succeeded: true
        }
      });
    } catch (err) {
      //Send the error
      next(err)
    }
  },

  confirm: async (req, res, next) => {

    try {
      const { token } = req.params;

      const data = await getTokenData(token);
      console.log(data);

      if (!data) {
        return res.status(400).send({
          status: {
            code: 400,
            message: "Invalid token",
            succeeded: false
          }
        });
      }

      const { email } = data.user;

      const user = await User.find({ email: email });

      if (!user) {
        return res.status(404).send({
          data: {
            user: user
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: false
          }
        });
      }

      let verifiedUser = await User.findOneAndUpdate({ email: email }, {
        blocked: false
      }, { new: true });


      res.send({
        data: {
          user: verifiedUser
        },
        status: {
          code: 200,
          message: "User register successfully completed",
          succeeded: true,
        }

      });

    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        msg: error.message
      })
    }
  },
  resetPassword: async (req, res, next) => {

    try {
      const email = req.body.email;
      const token = crypto.randomBytes(32).toString('hex');

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send({
          data: {
            user: user
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: false
          }
        });
      }

      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();

      const resetLink = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/public/users_reset/${token}`;

      await transporter.sendMail({
        from: '"Gym Api" <gym-api@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Password reset", // Subject line
        html: `
          <b> Click on the following link to complete the process: </b>
          <a href="${resetLink}"> ${resetLink} </a>
          `// html body
      });

      res.send({
        data: {
          user: user,
          token: token
        },
        status: {
          code: 200,
          message: "Successful request",
          succeeded: true
        }
      });


    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        msg: error.message
      })
    }

  },
  createNewPassword: async (req, res, next) => {
    try {
      const token = req.params.token;
      const newPassword = req.body.password;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).send({
          status: {
            code: 400,
            message: errors.array()[0],
            succeeded: false
          }
        });
      }

      const user = await User.findOneAndUpdate({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } },
        { password: newPassword }, { new: true }
      );

      if (!user) {
        return res.status(404).json({
          data: {
            user: user
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: true,
          }
        });
      };

      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      res.send({
        data: {
          user: user
        },
        status: {
          code: 200,
          message: "Password successfully updated",
          succeeded: true,
        }
      });

    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        msg: error.message
      })
    }
  },
  find: async (req, res, next) => {
    try {

      console.log(req.query);

      const {
        search = "",
        searchBy = "name",
        order = "desc",
        orderBy = "createdAt"
      } = req.query;

      const theUsers = await User.paginate({
        [searchBy]: {
          $regex: `${search}`,
          $options: 'i'
        }
      }, {
        sort: {
          [orderBy]: order
        }
      });

      res.send({
        data: {
          users: theUsers.docs,
          total: theUsers.total,
        },
        status: {
          code: 200,
          message: "Successful request",
          succeeded: true,
        }
      });

    } catch (err) {
      //se envia el error
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {

      const { id } = req.params;
      const user = await User.findById({
        _id: id
      });

      if (!user) {
        return res.status(404).json({
          data: {
            user: user
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: true,
          }
        });
      }

      await User.findByIdAndRemove(id);

      res.send({
        data: {
          user: user
        },
        status: {
          code: 200,
          message: "User successfully removed",
          succeeded: true,
        }
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {

    try {
      const { id } = req.params;
      let body = req.body;


      const user = await User.findById({
        _id: id
      });

      if (!user) {
        return res.status(404).json({
          data: {
            user: user
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: true,
          }
        });
      };
      const updatedUser = await User.findOneAndUpdate({ _id: id }, {
        name: body.name,
        email: body.email,
        role: body.role,
        blocked: body.blocked
      }, { new: true })

      res.send({
        data: {
          user: updatedUser
        },
        status: {
          code: 200,
          message: "User successfully updated",
          succeeded: true,
        }
      });
    } catch (error) {
      next(error);
    }

  },
  findOne: async (req, res, next) => {

    try {
      const { id } = req.params

      const theUser = await User.findById(id);

      if (!theUser) {
        return res.status(404).send({
          data: {
            user: theUser
          },
          status: {
            code: 404,
            message: "User not found",
            succeeded: true,
          }
        });
      }

      res.send({
        data: {
          user: theUser
        },
        status: {
          code: 200,
          message: "Successful request ",
          succeeded: true,
        }
      });
    } catch (error) {
      next(error);
    }

  }
};