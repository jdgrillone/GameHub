const router = require('express').Router();
const gameController = require("../controller/gameController");

router.route("/")
  .get(gameController.findAll);

router.route("/:name")
  .get(gameController.findOne);

router.route("/search/:name")
  .get(gameController.igdbFind);
  
module.exports = router;