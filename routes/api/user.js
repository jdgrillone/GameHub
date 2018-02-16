const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
    .get(userController.findAll)
    .post(userController.create);

module.exports = router;    