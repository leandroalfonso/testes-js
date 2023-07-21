const express = require('express');
const app = express();

const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');

// Middleware
app.use(cors());
app.use(express.json());

// Create a global connection to the database
const connection = mysql.createPool({
  host: 'sql.freedb.tech',
  user: 'freedb_leandro_bd3',
  password: 'b2yF3D*Bw&3eVX3',
  database: 'freedb_colaborador_bd',
});

// Configuring multer for file upload
const upload = multer({
  dest: 'uploads/', // Specify the destination folder to store uploaded files
});

// GET route for fetching data from the database
app.get('/', async (req, res) => {
  try {
    // Sample SQL query to fetch data from a table named 'usuarios'
    const [rows] = await connection.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error executing SELECT query:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Process the uploaded image here if needed
    // For example, you can save the image filename to the database

    const filename = req.file.filename;
    res.json({ filename });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Other routes can be defined here and use the global 'connection' variable

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
