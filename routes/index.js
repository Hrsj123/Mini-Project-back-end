var express = require('express');
var router = express.Router();

/* GET home page. */

router.use(express.static('../views/index.jade'));  //  ---> Wrong!

module.exports = router;
