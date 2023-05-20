var express = require('express');
var path = require('path');
var router = express.Router();
module.exports.router = router;
const { db } = require('../db');
require('dotenv').config();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Hello, World!
 *     description: Base page. Just says hello.
 *     operationId: base
 *     tags: [Users API]
 *     responses:
 *       200:
 *         description: Boring Text
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});



