const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const  DetailDepense  = require('../models/DetailDepense');
const Bulletin = require('../models/Bulletin');

// CREATE - Ajouter un nouveau DetailDepense
router.post('/ajout', async (req, res) => {
  try {
    const detailDepense = await DetailDepense.create(req.body);
    await Bulletin.update(
      { montantDepense: Sequelize.literal(`montantDepense + ${req.body.montant_act_dep}`) },
      { where: { numBs: req.body.bulletinNum } }
    );
    res.status(201).json(detailDepense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du DetailDepense' });
  }
});

// READ - Récupérer tous les DetailDepenses
router.get('/:numBs', async (req, res) => {
  try {
    const numBs = req.params.numBs;
    const detailDepenses = await DetailDepense.findAll(
      {where:{
        bulletinNum: numBs
      } }
    );
    res.json(detailDepenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des DetailDepenses' });
  }
});

// READ - Récupérer un DetailDepense par son ID
router.get('/:idD', async (req, res) => {
  const idD = req.params.idD;
  try {
    const detailDepense = await DetailDepense.findOne({ where: { idD } });
    if (detailDepense) {
      res.json(detailDepense);
    } else {
      res.status(404).json({ error: 'DetailDepense non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du DetailDepense' });
  }
});

// UPDATE - Mettre à jour un DetailDepense par son ID
router.put('/update/:idD', async (req, res) => {
  const idD = req.params.idD;
  try {
    const [updatedRows] = await DetailDepense.update(req.body, { where: { idD } });
    if (updatedRows > 0) {
      res.json({ message: 'DetailDepense mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'DetailDepense non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du DetailDepense' });
  }
});

// DELETE - Supprimer un DetailDepense par son ID
router.delete('/delete/:idD', async (req, res) => {
  const idD = req.params.idD;
  try {
    const deletedRows = await DetailDepense.destroy({ where: { idD } });
    if (deletedRows > 0) {
      res.json({ message: 'DetailDepense supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'DetailDepense non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du DetailDepense' });
  }
});

module.exports = router;
