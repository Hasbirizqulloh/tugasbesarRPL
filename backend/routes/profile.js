const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
  // Mendapatkan data pengguna dari database berdasarkan ID atau email
  const userId = req.session.userId; // Ubah dengan ID pengguna yang sesuai
  const query = 'SELECT * FROM peserta_kursus WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while fetching account data');
      return;
    }
    const profileData = result[0];
    // Render halaman profil dengan data pengguna
    res.render('profil.ejs', { profileData });
  });
});

router.put('/', (req, res) => {
  const userId = req.session.userId;
  const { nama, ttl, email, telepon } = req.body;
  const query = 'UPDATE peserta_kursus SET nama = ?, ttl = ?, email = ?, telepon = ? WHERE id = ?';
  db.query(query, [nama, ttl, email, telepon, userId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while updating account data');
      return;
    }
    res.redirect('/profile');
  });
});

module.exports = router;
