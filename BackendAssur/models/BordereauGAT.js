const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const BordereauGAT = sequelize.define('BordereauGAT', {
  idB: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type_act: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montant_act_dep: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  montant_act_rembor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = BordereauGAT;
