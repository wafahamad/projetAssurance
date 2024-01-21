// Admin.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
console.log('Creating Admin model');

const Admin = sequelize.define('Admin', {
  matricule: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateNaissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  motPasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
console.log('Admin model created');
module.exports = Admin;
