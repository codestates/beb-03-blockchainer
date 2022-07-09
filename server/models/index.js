"use strict";

const Sequelize = require("sequelize");

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Nft = require("./Nft");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Nft = Nft;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Nft.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Nft.associate(db);

module.exports = db;
