const async = require("async");
const { body, validationResult } = require("express-validator");

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
exports.category_create_post = [
  // Validate and santise the name field.
  body("name")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Category name required")
    .isLowercase()
    .withMessage("Must be all lowercase")
    .matches(/^(\w)+(-*(\w)+)+/)
    .withMessage(
      "Please enter only unaccented alphabetical letters, a–z. Separation may be done with dashes - or underscores _"
    ),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    var category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Category :: gameshop",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            // category saved. Redirect to category detail page.
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

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
