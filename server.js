const express = require('express');
const path = require('path');
const helmet = require("helmet");
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const api = require('./routes/api');
const app = express();

// Configurations for api limiter pkg
const apiLimiter = rateLimit({
	windowMs: 24* 60 * 60 * 1000, // 1 day in ms
	max: 10000, 
	standardHeaders: true, 
	legacyHeaders: false,
});

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

app.use('/api/', apiLimiter);
app.use(helmet());
app.use(compression());
app.use(cors());
app.set('view engine', 'ejs');
app.set("views", (path.join(__dirname, "public", "views")));
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', api);
app.use(express.json());

// Set generic headers for all routes
app.all('*', function (req, res, next) {
	res.set({
		"Connection": "Keep-Alive",
		"Keep-Alive": "timeout=5, max=1000",
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Origin": "*",
   });
    next();
});

// Main route to render to landing page
app.get('/', async (req, res) => {
	res.setHeader("Content-Type", "text/html");
    res.render('home');
});

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {  }); 

// Export app for testing purposes
module.exports = app;