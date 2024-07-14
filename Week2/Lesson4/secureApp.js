const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Sets various HTTP headers to secure the app
app.use(bodyParser.json());
app.use(xss()); // Sanitize user input to prevent XSS attacks
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks
app.use(cors()); // Enable CORS
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

// Mock user database
const users = [
  { id: 1, username: 'user1', password: 'pass1' }, // For demonstration purposes only
];

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Routes
app.post('/login', (req, res) => {
  // Authenticate User
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET);
    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.get('/secure-data', authenticateJWT, (req, res) => {
  res.json({ data: 'Secure data' });
});

// HTTPS server
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Secure App listening at https://localhost:${port}`);
});