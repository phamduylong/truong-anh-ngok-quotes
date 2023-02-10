const express = require('express');
const path = require('path');
const helmet = require("helmet");
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const api = require('./routes/api');
const app = express();


const apiLimiter = rateLimit({
	windowMs: 24* 60 * 60 * 1000, // 1 day in ms
	max: 10000, 
	standardHeaders: true, 
	legacyHeaders: false,
})

app.use('/api/', apiLimiter);
app.use(helmet());
app.use(compression());
app.use(cors());
app.set('view engine', 'ejs');
app.set("views", (path.join(__dirname, "public", "views")));
app.use(express.static(path.join(__dirname, "public")));
app.all('*', function (req, res, next) {
	res.set({
		"Connection": "Keep-Alive",
		"Keep-Alive": "timeout=5, max=1000",
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Origin": "*",
   });
    next();
});

app.use('/api', api);
app.use(express.json());

app.get('/', async (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {  }); 

module.exports = app;