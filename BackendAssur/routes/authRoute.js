const express = require('express');
const bcrypt = require('bcrypt');
const Navigant = require('../models/Navigant');
const Admin = require('../models/Admin');

const { generateToken } = require('../utils/jwt');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { matricule, motPasse ,nom,dateNaissance,numCompte,fonction,marie,nomConjoint} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(motPasse, 10);
    const navigant = new Navigant({ matricule, motPasse: hashedPassword ,nom,dateNaissance,numCompte,fonction,marie,nomConjoint});
    await navigant.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { matricule, motPasse } = req.body;

  try {
    const navigant = await Navigant.findOne({ matricule });

    if (!navigant) {
      return res.status(401).json({ error: 'Invalid matricule' });
    }

    const passwordMatch = await bcrypt.compare(motPasse, navigant.motPasse);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(navigant);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/ajoutAdmin', async (req, res) => {
  const { matricule, motPasse ,nom,dateNaissance} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(motPasse, 10);
    const admin = new Admin({ matricule, motPasse: hashedPassword ,nom,dateNaissance});
    await admin.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/loginAdmin', async (req, res) => {
  const { matricule, motPasse } = req.body;

  try {
    const admin = await Admin.findOne({ matricule });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid matricule' });
    }

    const passwordMatch = await bcrypt.compare(motPasse, admin.motPasse);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(admin);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
