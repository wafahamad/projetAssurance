const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const Bulletin = require('./Bulletin');
const NavigEnfant = require('./NavigEnfant');
const Reclamation = require('./Reclamation');


const Navigant = sequelize.define('Navigant', {
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
  numCompte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motPasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fonction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marie: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  nomConjoint: {
    type: DataTypes.STRING
  }
});

// Define the one-to-many relationship with Bulletin
Navigant.hasMany(Bulletin, { as: 'Bulletins', foreignKey: 'navigantId',onDelete: 'CASCADE' });

// Define the one-to-many relationship with NavigEnfant
Navigant.hasMany(NavigEnfant, { as: 'NavigEnfants', foreignKey: 'navigantId',onDelete: 'CASCADE' });

// Define the one-to-many relationship with Reclamation
Navigant.hasMany(Reclamation, { as: 'Reclamations', foreignKey: 'navigantId',onDelete: 'CASCADE' });
Reclamation.belongsTo(Navigant, { foreignKey: 'navigantId', as: 'navigant' });

module.exports = Navigant;
