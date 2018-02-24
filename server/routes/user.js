const router = require('express').Router();
const userController = require('../controller/userController');

router.route("/update")
    .post(userController.findOneAndUpdate);

module.exports = router;