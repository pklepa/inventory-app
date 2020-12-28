const async = require("async");
const Game = require("../models/game");
const Category = require("../models/category");

// Display list of all games.
exports.game_list = function (req, res, next) {
  async.parallel(
    {
      games: function (callback) {
        Game.find({})
          .sort([["name", "ascending"]])
          .populate("categories")
          .exec(callback);
      },
      categories: function (callback) {
        Category.find()
          .sort([["name", "asc"]])
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      results.games.map((game) => {
        const sortedArr = game.categories.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });

        return { ...game._doc, categories: sortedArr };
      });

      res.render("index", {
        title: "Gameshop - All games",
        game_list: results.games,
        category_list: results.categories,
      });
    }
  );
};

// Display detail page for a specific game.
exports.game_detail = function (req, res, next) {
  // console.log(req.params.id);
  Game.findById(req.params.id)
    .populate("categories")
    .exec(function (err, game) {
      if (err) return next(err);

      // Successful, so sort populated data and render

      // Sort categories alphabetically
      game.categories.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });

      res.render("game", {
        title: game.name + " :: gameshop",
        game: game,
      });
    });
};

// Display Game create form on GET.
exports.game_create_get = function (req, res) {
  res.render("game_form", {
    title: "New Game :: gameshop",
  });
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
