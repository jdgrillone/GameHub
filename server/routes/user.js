const router = require('express').Router();
const userController = require('../controller/userController');

router.route("/")
    .get(userController.findAll);

router.route("/update")
    .post(userController.findOneAndUpdate);    

router.route("/delete")
    .post(userController.findOneAndDelete);

router.route("/follow")
    .post(userController.findOneAndFollow);

router.route("/active")
    .post(userController.findOneAndToggle);

router.route("/:id")
    .get(userController.findOne);

router.route("/:id/following")
    .get(userController.findOnePopulateFollowing);

router.route("/search/:name")
    .get(userController.findUser);

module.exports = router;