'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    snippet(){
      return this.description.substring(0,300);
    }

    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Movie.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};