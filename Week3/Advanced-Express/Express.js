const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());


const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
});

const validateBody = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

app.post('/api/users', validateBody, (req, res) => {
    res.send('User created');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});