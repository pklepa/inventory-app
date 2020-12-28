const async = require("async");
const Game = require("../models/game");
const Category = require("../models/category");

// Display list of all games in selected category.
exports.category_game_list = function (req, res, next) {
  async.parallel(
    {
      games: function (callback) {
        Game.find({ categories: req.params.id })
          .sort([["name", "ascending"]])
          .populate("categories")
          .exec(callback);
      },
      categories: function (callback) {
        Category.find()
          .sort([["name", "asc"]])
          .exec(callback);
      },
      selected_category: function (callback) {
        Category.findById(req.params.id).exec(callback);
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

      res.render("category", {
        title: results.selected_category.name + " :: gameshop",
        game_list: results.games,
        category_list: results.categories,
        selected_category: results.selected_category,
      });
    }
  );
};

// Display Category create form on GET.
exports.category_create_get = function (req, res) {
  res.render("category_form", {
    title: "Create Category :: gameshop",
  });
};

// Display Category create form on POST.
exports.category_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category create form POST");
};

// Display Category delete form on GET.
exports.category_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category delete form GET");
};

// Display Category delete form on GET.
exports.category_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category delete form POST");
};

// Display Category update form on GET.
exports.category_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Category update form GET");
};

// Display Category update form on GET.
exports.category_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Category update form POST");
};
