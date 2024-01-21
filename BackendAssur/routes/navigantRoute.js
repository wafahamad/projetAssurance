const express = require('express');
const router = express.Router();
const Navigant = require('../models/Navigant');
const NavigEnfant = require('../models/NavigEnfant');
const Bulletin = require('../models/Bulletin');


// READ - Récupérer tous les Navigants
router.get('/', async (req, res) => {
  try {
    const navigants = await Navigant.findAll({
      include: [{ model: Bulletin, as: 'Bulletins' }, { model: NavigEnfant, as: 'NavigEnfants' }]
    });
    res.json(navigants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des Navigants' });
  }
});

// READ - Récupérer un Navigant par son matricule
router.get('/:matricule', async (req, res) => {
  const matricule = req.params.matricule;
  try {
    const navigant = await Navigant.findOne({
      where: { matricule },
      include: [{ model: Bulletin, as: 'Bulletins' },
       { model: NavigEnfant, as: 'NavigEnfants' },
       { model: Reclamation, as: 'Reclamations' } ]
    });
    if (navigant) {
      res.json(navigant);
    } else {
      res.status(404).json({ error: 'Navigant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du Navigant' });
  }
});

// UPDATE - Mettre à jour un Navigant par son matricule
router.put('/update/:matricule', async (req, res) => {
  const matricule = req.params.matricule;
  try {
    const [updatedRows] = await Navigant.update(req.body, {
      where: { matricule }
    });
    if (updatedRows > 0) {
      res.json({ message: 'Navigant mis à jour avec succès' });
    } else {
      res.status(404).json({ error: 'Navigant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du Navigant' });
  }
});

// DELETE - Supprimer un Navigant par son matricule
router.delete('/delete/:matricule', async (req, res) => {
  const matricule = req.params.matricule;
  try {
    const deletedRows = await Navigant.destroy({
      where: { matricule }
    });
    if (deletedRows > 0) {
      res.json({ message: 'Navigant supprimé avec succès' });
    } else {
      res.status(404).json({ error: 'Navigant non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du Navigant' });
  }
});

module.exports = router;
