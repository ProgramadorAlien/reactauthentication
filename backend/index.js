const express = require('express');
const mysql = require('mysql');
const db = require('./database');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    // Insert user into database
    db.query('INSERT INTO account (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
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

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
