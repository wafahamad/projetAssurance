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
    defaultValue:0
  },
  dateEnvoiGAT: {
    type: DataTypes.DATE,
  },
  dateRem: {
    type: DataTypes.DATE,
  },
  montantRemborse: {
    type: DataTypes.FLOAT,
    defaultValue:0
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Bulletin.hasMany(DetailDepense, { as: 'DetailDepenses', foreignKey: 'bulletinNum',onDelete: 'CASCADE' });
Bulletin.hasMany(BordereauGAT, { as: 'BordereauGATs', foreignKey: 'bulletinNum' ,onDelete: 'CASCADE'});

Bulletin.beforeUpdate(async (bulletin, options) => {
  // Calculer le montant total des détails de dépense
  const montantTotal = await DetailDepense.sum('montant_act_dep', {
    where: {
      bulletinNum: bulletin.numBs,
    },
  });
  const montantTotalRemb = await BordereauGAT.sum('montant_act_rembor',{
    where: {
      bulletinNum: bulletin.numBs,
    },
  });

  // Mettre à jour le montantDepense
  bulletin.montantDepense = montantTotal;
  bulletin.montantRemborse = montantTotalRemb;
});
module.exports = Bulletin;
