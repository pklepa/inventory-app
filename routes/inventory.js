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
router.get("/category/create", categoryController.category_create_get);

// POST create category view
router.post("/category/create", categoryController.category_create_post);

// POST delete category view
router.post("/category/:id/delete", categoryController.category_delete_post);

// GET category view
router.get("/category/:id", categoryController.category_game_list);

module.exports = router;
