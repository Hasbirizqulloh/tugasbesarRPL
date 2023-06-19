const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/database');

router.get('/', (req, res) => {
  // Menampilkan halaman register
  res.sendFile(path.join(__dirname, '../../frontend/register.html'));
});

router.post('/', (req, res) => {
  const { nama, password, email, confirmPassword } = req.body;

  if (!nama) {
    // Nama tidak ada atau bernilai null
    res.status(400).json({ message: 'Name is required' });
    return;
  }

  if (password !== confirmPassword) {
    // Password dan konfirmasi password tidak cocok
    res.status(400).json({ message: 'Password and Confirm Password do not match' });
    return;
  }

  const query = 'INSERT INTO peserta_kursus (nama, password, email) VALUES (?, ?, ?)';
  db.query(query, [nama, password, email], (err, result) => {
    if (err) {
      // Tangani kesalahan dengan mengirim respons yang sesuai
      console.error(err);
      res.status(500).json({ message: 'An error occurred while registering' });
      return;
    }
    // Pendaftaran berhasil
    res.redirect('/login');
  });
});

module.exports = router;
