const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const NavigEnfant = sequelize.define('NavigEnfant', {
  idE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = NavigEnfant;
