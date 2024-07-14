const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Route for the homepage
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Route for the same API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Data received' });
});

const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use(loggerMiddleware);

