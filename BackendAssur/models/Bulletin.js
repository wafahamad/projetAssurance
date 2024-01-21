const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../database');
const BordereauGAT = require('./BordereauGAT');
const DetailDepense = require('./DetailDepense');

const Bulletin = sequelize.define('Bulletin', {
  numBs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  malade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateSoin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  montantDepense: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateEnvoiGAT: {
    type: DataTypes.DATE,
  },
  dateRem: {
    type: DataTypes.DATE,
  },
  montantRemborse: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Bulletin.hasMany(DetailDepense, { as: 'DetailDepenses', foreignKey: 'bulletinNum',onDelete: 'CASCADE' });
Bulletin.hasMany(BordereauGAT, { as: 'BordereauGATs', foreignKey: 'bulletinNum' ,onDelete: 'CASCADE'});

module.exports = Bulletin;
