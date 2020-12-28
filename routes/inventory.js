var express = require("express");
var router = express.Router();

const gameController = require("../controllers/gameController");
const categoryController = require("../controllers/categoryController");

/* GET home page. */
router.get("/", gameController.game_list);

/// GAME ROUTES -----------------------

// GET create game view
router.get("/game/create", gameController.game_create_get);

// POST create game view
router.post("/game/create", gameController.game_create_post);

// GET delete game view
router.get("/game/:id/delete", gameController.game_delete_get);

// POST delete game view
router.post("/game/:id/delete", gameController.game_delete_post);

// GET update game view
router.get("/game/:id/update", gameController.game_update_get);

// POST update game view
router.post("/game/:id/update", gameController.game_update_post);

// GET game view
router.get("/game/:id", gameController.game_detail);

/// CATEGORY ROUTES ---------------------------------

// GET create category view
router.get("/category/create", function (req, res, next) {
  res.send("Not implemented: GET create category view");
});

// POST create category view
router.post("/category/create", function (req, res, next) {
  res.send("Not implemented: POST create category view");
});

// GET delete category view
router.get("/category/:id/delete", function (req, res, next) {
  res.send("Not implemented: GET delete category view");
});

// POST delete category view
router.post("/category/:id/delete", function (req, res, next) {
  res.send("Not implemented: POST delete category view");
});

// GET update category view
router.get("/category/:id/update", function (req, res, next) {
  res.send("Not implemented: GET update category view");
});

// POST update category view
router.post("/category/:id/update", function (req, res, next) {
  res.send("Not implemented: POST update category view");
});

// GET category view
router.get("/category/:id", categoryController.category_game_list);

module.exports = router;
