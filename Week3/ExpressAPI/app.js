const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/items', (req, res) => {
    res.json({ message: 'Get all items' });
});

app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    res.json({ message: `Get item with id ${itemId}` });
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    res.json({ message: 'Item added', item: newItem });
});

app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    res.json({ message: `Item with id ${itemId} updated`, item: updatedItem });
});

app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    res.json({ message: `Item with id ${itemId} deleted` });
});

