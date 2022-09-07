const {
  UserController
} = require("../controller");
let router = require('express').Router();
const rateLimit = require("express-rate-limit");
const { body } = require('express-validator/check');
const { application } = require("express");

const securityAuthLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: "Too many request created from this IP, please try again after an hour"
});
/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Activities
 *     description: Endpoint para login
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User
 *         schema:
 *           $ref: '#/definitions/UserSchema'
 *       500:
 *         description: SERVER ERROR
 */
router.post("/login", securityAuthLimiter, UserController.login);


module.exports = router;