const express = require('express');
const gameController = require("../controller/gameController.js");

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message.",
        // user values passed through from auth middleware
        user: req.user
    });
});

router.route("/api")
    .get(gameController.findAll);

module.exports = router;
