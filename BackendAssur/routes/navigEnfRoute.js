const express = require('express');
const router = express.Router();
const NavigEnfant  = require('../models/NavigEnfant');

// CREATE - Ajouter un nouveau NavigEnfant
router.post('/ajoutEnfant', async (req, res) => {
  try {
    const navigEnfant = await NavigEnfant.create(req.body);
    res.status(201).json(navigEnfant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du NavigEnfant' });
  }
});

// READ - Récupérer tous les NavigEnfants
router.get('/:matricule', async (req, res) => {
  try {
    const matricule = req.params.matricule;
    const enfants = await NavigEnfant.findAll({
      where: {
        navigantId: matricule
      }
    });
    res.json(enfants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des NavigEnfants' });
  }
});

// READ - Récupérer un NavigEnfant par son ID
router.get('/:idE', async (req, res) => {
  const idE = req.params.idE;
  try {
    const navigEnfant = await NavigEnfant.findOne({ where: { idE } });
    if (navigEnfant) {
      res.json(navigEnfant);
    } else {
      res.status(404).json({ error: 'NavigEnfant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du NavigEnfant' });
  }
});

// UPDATE - Mettre à jour un NavigEnfant par son ID
router.put('/updateEnfant/:idE', async (req, res) => {
  const idE = req.params.idE;
  try {
    const [updatedRows] = await NavigEnfant.update(req.body, { where: { idE } });
    if (updatedRows > 0) {
      res.json({ message: 'NavigEnfant mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'NavigEnfant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du NavigEnfant' });
  }
});

// DELETE - Supprimer un NavigEnfant par son ID
router.delete('/deleteEnfant/:idE', async (req, res) => {
  const idE = req.params.idE;
  try {
    const deletedRows = await NavigEnfant.destroy({ where: { idE } });
    if (deletedRows > 0) {
      res.json({ message: 'NavigEnfant supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'NavigEnfant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du NavigEnfant' });
  }
});

module.exports = router;
