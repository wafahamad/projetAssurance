const express = require('express');
const router = express.Router();
const Reclamation = require('../models/Reclamation');
const Navigant =require('../models/Navigant');
// CREATE - Ajouter une nouvelle Réclamation
router.post('/envoyer/:matricule', async (req, res) => {
  try {
    const { contenu } = req.body;  
      const navigantMatricule = req.params.matricule;
    
    // Assurez-vous que le navigant existe avant de créer une réclamation
    const navigant = await Navigant.findOne({ where: { matricule: navigantMatricule } });
    if (!navigant) {
      return res.status(404).json({ error: 'Navigant non trouvé' });
    }

    // Création de la réclamation
    const reclamation = await Reclamation.create({ contenu, navigantId: navigantMatricule });
    res.status(201).json(reclamation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la Réclamation' });
  }
});

// READ - Récupérer toutes les Réclamations
router.get('/', async (req, res) => {
  try {
    const reclamations = await Reclamation.findAll();
    res.json(reclamations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des Réclamations' });
  }
});

// READ - Récupérer une Réclamation par son ID
router.get('/:num', async (req, res) => {
  const num = req.params.num;
  try {
    const reclamation = await Reclamation.findOne({ where: { num } });
    if (reclamation) {
      res.json(reclamation);
    } else {
      res.status(404).json({ error: 'Réclamation non trouvée' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la Réclamation' });
  }
});


// DELETE - Supprimer une Réclamation par son ID
router.delete('/:num', async (req, res) => {
  const num = req.params.num;
  try {
    const deletedRows = await Reclamation.destroy({ where: { num } });
    if (deletedRows > 0) {
      res.json({ message: 'Réclamation supprimée avec succès' });
    } else {
      res.status(404).json({ error: 'Réclamation non trouvée' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la Réclamation' });
  }
});

module.exports = router;
