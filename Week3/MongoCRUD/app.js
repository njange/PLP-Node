const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongo-crud', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
 });

// Create a new user
app.post('/users', async (req, res) => {
    try {
    const newUser = await  User.create(req.body);
    res.status(201).json( newUser);} catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users);} catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a user
app.get('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findById(req.params.id, { new: true });
    res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});