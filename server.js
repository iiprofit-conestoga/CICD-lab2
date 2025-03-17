const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Test comment added
// Test commnet added 1.2
// Test commnet added 1.3
// Test commnet added 1.4
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, Jenkins!' });
});

app.get('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.post('/sum', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Invalid input' });
    }
    res.json({ sum: num1 + num2 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;