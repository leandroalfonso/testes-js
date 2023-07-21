const express = require('express');
const app = express();

const cors = require('cors');
const mysql = require('mysql2/promise');

// Middleware
app.use(cors());
app.use(express.json());

// GET route
app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mybd',
    });

    // Sample SQL query to fetch data from a table named 'usuarios'
    const [rows] = await connection.execute('SELECT * FROM usuarios');

    connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/pagina', async (req, res) => {
  res.sendFile('public/index.html', { root: __dirname }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', 'index.html');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});