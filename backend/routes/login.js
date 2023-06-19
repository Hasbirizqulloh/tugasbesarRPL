// routes/login.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
  // Menampilkan halaman login
  res.sendFile('login.html', { root: '../frontend' });
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM peserta_kursus WHERE email = ? AND password = ?';
  const queryCheckEmail = 'SELECT * FROM peserta_kursus WHERE email = ?';

  db.query(queryCheckEmail, [email], (err, emailResult) => {
    if (err) {
      throw err;
    }
    if (emailResult.length > 0) {
      // Email sudah terdaftar, proses login
      db.query(query, [email, password], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          const userId = result[0].id; // Ambil ID pengguna dari hasil query SELECT
          req.session.userId = userId; // Simpan ID pengguna ke sesi

          // Redirect ke halaman dashboard
          res.redirect('/dashboard');
        } else {
          // Login gagal
          res.redirect('/login');
        }
      });
    } else {
      // Email belum terdaftar
      res.status(401).json({ message: 'Email is not registered' });
    }
  });
});

module.exports = router;
