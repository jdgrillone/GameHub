const router = require('express').Router();
const userController = require('../controller/userController');

router.route("/update")
    .post(userController.findOneAndUpdate);

router.route("/")
    .get(userController.findAll);

router.route("/:id")
    .get(userController.findOne);

router.route("/delete")
    .post(userController.findOneAndDelete);

router.route("/follow")
    .post(userController.findOneAndFollow);

module.exports = router;