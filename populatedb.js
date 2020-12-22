#! /usr/bin/env node

console.log(
  "This script populates some test games and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Game = require("./models/game");
var Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var games = [];
var categories = [];

function gameCreate(
  game_name,
  game_description,
  game_categories,
  game_platform,
  price,
  imgUrl,
  cb
) {
  gamedetail = {
    name: game_name,
    description: game_description,
    categories: game_categories,
    platform: game_platform,
    imgUrl: imgUrl || "https://dummyimage.com/250/333333/e3e3e3",
    price: price || "Unknown",
  };

  var game = new Game(gamedetail);

  game.save(function (err) {
    if (err) {
      console.log("ERROR CREATING Game: " + game);
      cb(err, null);
      return;
    }
    console.log("New Game: " + game);
    games.push(game);
    cb(null, game);
  });
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description || "" });

  category.save(function (err) {
    if (err) {
      console.log("ERROR CREATING Category: " + category);
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("single-player", false, callback);
      },
      function (callback) {
        categoryCreate("multi-player", false, callback);
      },
      function (callback) {
        categoryCreate("co-op", false, callback);
      },
      function (callback) {
        categoryCreate("3d", false, callback);
      },
      function (callback) {
        categoryCreate("platformer", false, callback);
      },
      function (callback) {
        categoryCreate("open-world", false, callback);
      },
      function (callback) {
        categoryCreate("simulation", false, callback);
      },
      function (callback) {
        categoryCreate("arcade", false, callback);
      },
      function (callback) {
        categoryCreate("sports", false, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "Overcooked!",
          "Overcooked is a chaotic couch co-op cooking game for one to four players. Working as a team, you and your fellow chefs must prepare, cook, and serve up a variety of tasty orders before the baying customers storm out in a huff. [Playstation.com]",
          [categories[1], categories[2], categories[6], categories[7]],
          ["PC", "Console"],
          10,
          "https://image.api.playstation.com/cdn/EP4064/CUSA05399_00/IrBlF6iMnsE8Js5M376IJEYKZXuiRMFz.png",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Super Mario Odyssey",
          "New Evolution of Mario Sandbox-Style Gameplay. Mario embarks on a new journey through unknown worlds, running and jumping through huge 3D worlds in the first sandbox-style Mario game since Super Mario 64 and Super Mario Sunshine. Set sail between expansive worlds aboard an airship, and perform all-new actions, such as throwing Mario's cap.",
          [categories[0], categories[3], categories[4], categories[7]],
          ["Console"],
          20,
          "https://images-na.ssl-images-amazon.com/images/I/91JZdTYcjFL._AC_SL1500_.jpg",
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Rocket League",
          "Rocket League is a high-powered hybrid of arcade soccer and driving with rewarding physics-based gameplay. Take to the pitch for a fully-featured offline season mode, multiple game types, casual and competitive online matches, and special 'Mutators' that let you change the rules entirely. Express yourself with one of the deepest customization systems around and battle opponents on other platforms with cross-network play.",
          [categories[7], categories[8]],
          ["PC", "Console"],
          5,
          "https://cdn2.unrealengine.com/egs-rocketleague-psyonixllc-s2-1200x1600-b1aecb2c82d9.jpg",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createGames],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Success!");
      console.log("Games: " + games);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
