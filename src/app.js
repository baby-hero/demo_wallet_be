const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


// Some untilities
app.use(morgan('dev'));
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add headers to avoid CORS problem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 
               'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); 
    }
    next();
});

// Routes
const walletRoutes = require('./controllers/wallet');

// All routes here
app.use('/api/v1/wallet', walletRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;
