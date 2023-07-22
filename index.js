const express = require('express');
const app = express();

const cors = require('cors');
const mysql = require('mysql2/promise');

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

// GET route
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

// Other routes can be defined here and use the global 'connection' variable

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
