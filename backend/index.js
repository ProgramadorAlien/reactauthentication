const express = require('express');
const mysql = require('mysql');
const db = require('./database');



// Attempt to acquire a connection from the pool to check the connection
db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    
    console.log('Connected to database successfully!');
    
    // Release the connection back to the pool
    connection.release();
  });
  


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Insert user into database
  db.query('INSERT INTO account (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to register user' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Check if user exists in database
  db.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to login' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  });
});



app.get('/', (req, res) =>{
    res.send('Hello World');
}); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
