'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const foodModel = require('./food');
const restaurantModel = require('./restaurant');

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelizeInstance = new Sequelize(DATABASE_URL);

const foodTable = foodModel(sequelizeInstance, DataTypes);
const restaurantTable = restaurantModel(sequelizeInstance, DataTypes);

module.exports = {
    db: sequelizeInstance,
    food: foodTable,
    restaurant: restaurantTable,
};