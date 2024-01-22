const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const Reclamation = sequelize.define('Reclamation', {
    num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    contenu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lue:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
   
  });
  
  module.exports = Reclamation;