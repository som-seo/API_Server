'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const Hashtag = require('./hashtag');
const Post = require('./post');
const User = require('./user');
const Domain=require('./domain');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};
const sequelize=new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User=User;
db.Post=Post;
db.Hashtag=Hashtag;
db.Domain=Domain;

User.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);
Domain.initiate(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);

module.exports = db;
