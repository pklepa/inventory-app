const async = require("async");
const Game = require("../models/game");

// Display list of all games.
exports.game_list = function (req, res, next) {
  Game.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_games) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("index", {
        title: "Games",
        game_list: list_games,
      });
    });
};

// Display detail page for a specific game.
exports.game_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Game detail: " + req.params.id);
};

// Display Game create form on GET.
exports.game_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game create form GET");
};

// Display Game create form on POST.
exports.game_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game create form POST");
};

// Display Game delete form on GET.
exports.game_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game delete form GET");
};

// Display Game delete form on GET.
exports.game_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game delete form POST");
};

// Display Game update form on GET.
exports.game_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Game update form GET");
};

// Display Game update form on GET.
exports.game_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Game update form POST");
};
