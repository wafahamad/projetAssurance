const { DataTypes } = require('sequelize');
const { sequelize } = require('../database'); 

const DetailDepense = sequelize.define('DetailDepense', {
    idD: {
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
});

module.exports = DetailDepense;
