const async = require("async");
const { body, validationResult } = require("express-validator");

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
exports.game_create_get = function (req, res, next) {
  Category.find()
    .sort([["name", "asc"]])
    .exec(function (err, category_list) {
      if (err) return next(err);

      // Successful, so render
      res.render("game_form", {
        title: "New Game :: gameshop",
        category_list: category_list,
      });
    });
};

// Display Game create form on POST.
exports.game_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitise fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Game name must not be empty.")
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must not be empty (min 10, max 1000 characters).")
    .escape(),
  body("category")
    .isLength({ min: 1 })
    .withMessage("Select at least one category."),
  body("category.*").escape(),
  body("imgUrl").isURL().withMessage("Image URL must be a valid URL.").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Game object with escaped and trimmed data.
    var game = new Game({
      name: req.body.name,
      description: req.body.description,
      categories: req.body.category,
      imgUrl: req.body.imgUrl,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form.
      Category.find()
        .sort([["name", "asc"]])
        .exec(function (err, category_list) {
          if (err) return next(err);

          // Successful, so render
          res.render("game_form", {
            title: "New Game :: gameshop",
            category_list: category_list,
            game: game,
            errors: errors.array(),
          });
        });
      return;
    } else {
      // Data from form is valid. Save game.
      game.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to new game record.
        res.redirect(game.url);
      });
    }
  },
];

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
