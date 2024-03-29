const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const  BordereauGAT  = require('../models/BordereauGAT');
const Bulletin = require('../models/Bulletin');
// CREATE - Ajouter un nouveau BordereauGAT
router.post('/ajout', async (req, res) => {
  try {
    const bordereauGAT = await BordereauGAT.create(req.body);
    await Bulletin.update(
      { montantRemborse: Sequelize.literal(`montantRemborse + ${req.body.montant_act_rembor}`) },
      { where: { numBs: req.body.bulletinNum } }
    );
    res.status(201).json(bordereauGAT);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du BordereauGAT' });
  }
});

// READ - Récupérer tous les BordereauGATs
router.get('/:numBs', async (req, res) => {
  try {
    const numBs = req.params.numBs;
    const bordereauGATs = await BordereauGAT.findAll(
      {where:{
        bulletinNum: numBs
      } }
    );
    res.json(bordereauGATs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des BordereauGATs' });
  }
});

// READ - Récupérer un BordereauGAT par son ID
router.get('/:idB', async (req, res) => {
  const idB = req.params.idB;
  try {
    const bordereauGAT = await BordereauGAT.findOne({ where: { idB } });
    if (bordereauGAT) {
      res.json(bordereauGAT);
    } else {
      res.status(404).json({ error: 'BordereauGAT non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du BordereauGAT' });
  }
});

// UPDATE - Mettre à jour un BordereauGAT par son ID
router.put('/updateBord/:idB', async (req, res) => {
  const idB = req.params.idB;
  try {
    const [updatedRows] = await BordereauGAT.update(req.body, { where: { idB } });
    if (updatedRows > 0) {
      res.json({ message: 'BordereauGAT mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'BordereauGAT non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du BordereauGAT' });
  }
});

// DELETE - Supprimer un BordereauGAT par son ID
router.delete('/deleteBord/:idB', async (req, res) => {
  const idB = req.params.idB;
  try {
    const bordereauGAT = await BordereauGAT.findOne({ where: { idB } });
    if (!bordereauGAT) {
      return res.status(404).json({ error: 'BordereauGAT non trouvé' });
    }
    const deletedRows = await BordereauGAT.destroy({ where: { idB } });
    await Bulletin.update(
      { montantRemborse: Sequelize.literal(`montantRemborse - ${bordereauGAT.montant_act_rembor}`) },
      { where: { numBs: bordereauGAT.bulletinNum } }
    );

    if (deletedRows > 0) {
      res.json({ message: 'BordereauGAT supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'BordereauGAT non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du BordereauGAT' });
  }
});


module.exports = router;
