const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/status', (req, res) => {
    res.send({
        message: 'hello world!'
    })
});

app.post('/login', (req, res) => {
    if (req.body.login === 'admin' && req.body.password === 'pass') {
        res.send({
            message: 'Logged In!'
        })
    } else {
        res.send({
            message: 'Wrong Login / Password!'
        })
    }
    
})

app.post('/register', (req, res) => {
    res.send({
        message: req.body.txt + '!!'
    })
})

app.listen(process.env.PORT || 8081);
