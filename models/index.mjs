import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initBugModel from './bugs.mjs';
import initFeatureModel from './features.mjs';
import initUserModel from './users.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// add your model definitions to db here
db.Bug = initBugModel(sequelize, Sequelize.DataTypes);
db.Feature = initFeatureModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.Bug.belongsTo(db.Feature);
db.Feature.hasMany(db.Bug);

db.Bug.belongsTo(db.User);
db.User.hasMany(db.Bug);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
