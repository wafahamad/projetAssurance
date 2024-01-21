const express = require('express');
const router = express.Router();
const Bulletin = require('../models/Bulletin');
const DetailDepense = require('../models/DetailDepense');
const BordereauGAT = require('../models/BordereauGAT');
// CREATE - Add a new Bulletin
router.post('/ajout', async (req, res) => {
  try {
    const bulletin = await Bulletin.create(req.body);
    res.status(201).json(bulletin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating Bulletin' });
  }
});

// READ - Get all Bulletins
router.get('/', async (req, res) => {
  try {
    const bulletins = await Bulletin.findAll({
      include: [{ model: DetailDepense, as: 'DetailDepenses' }, { model: BordereauGAT, as: 'BordereauGATs' }]
    });
    res.json(bulletins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Bulletins' });
  }
});
// READ - Get all Bulletins by navigant
router.get('/byNavigant/:matricule', async (req, res) => {
  try {
    const matricule = req.params.matricule;
    const bulletins = await Bulletin.findAll({
      where: {
        navigantId: matricule
      },
      include: [{ model: DetailDepense, as: 'DetailDepenses' }, { model: BordereauGAT, as: 'BordereauGATs' }]
    });
    res.json(bulletins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Bulletins' });
  }
});
// READ - Get a Bulletin by its numBs
router.get('/:numBs', async (req, res) => {
  const numBs = req.params.numBs;
  try {
    const bulletin = await Bulletin.findOne({
      where: { numBs },
      include: [{ model: DetailDepense, as: 'DetailDepenses' }, { model: BordereauGAT, as: 'BordereauGATs' }]
    });
    if (bulletin) {
      res.json(bulletin);
    } else {
      res.status(404).json({ error: 'Bulletin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving Bulletin' });
  }
});

// UPDATE - Update a Bulletin by its numBs
router.put('/updateBull/:numBs', async (req, res) => {
  const numBs = req.params.numBs;
  try {
    const [updatedRows] = await Bulletin.update(req.body, {
      where: { numBs }
    });
    if (updatedRows > 0) {
      res.json({ message: 'Bulletin updated successfully' });
    } else {
      res.status(404).json({ error: 'Bulletin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating Bulletin' });
  }
});

// DELETE - Delete a Bulletin by its numBs
router.delete('/deleteBull/:numBs', async (req, res) => {
  const numBs = req.params.numBs;
  try {
    const deletedRows = await Bulletin.destroy({
      where: { numBs }
    });
    if (deletedRows > 0) {
      res.json({ message: 'Bulletin deleted successfully' });
    } else {
      res.status(404).json({ error: 'Bulletin not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting Bulletin' });
  }
});

module.exports = router;
