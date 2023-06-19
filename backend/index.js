const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, '../frontend');
app.use(express.static(publicPath));

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Rute halaman landing
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Rute Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(publicPath, 'index_after.html'));
});

// Rute profile
const profileRouter = require('./routes/profile');
app.use('/profile', profileRouter);

// Rute halaman login
const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);

// Rute halaman register
const registerModel = require('./model/register');
app.use('/register', registerModel);

app.get('/logout', (req, res) => {
  // Lakukan logika logout di sini (misalnya menghapus sesi atau token yang digunakan)

  //  session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      // Handle error jika terjadi masalah saat menghapus sesi
    }
    // Redirect pengguna ke halaman login setelah logout
    res.redirect('/login');
  });
});

// Menjalankan server pada port tertentu
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
