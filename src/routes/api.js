const express = require("express");
const router = express.Router();
const {quotes, fetchQuotes} = require('../../assets/quotes');
//main route
router.get("/quotes", async (req, res) => {
    res.json(fetchQuotes(1));
});

//fetching report route
router.get("/quotes/:amount", async (req, res) => {
    const requested_amount = Number(req.params.amount);
    isNaN(requested_amount) ? res.statusCode = 500 : res.statusCode = 200;
    res.json(fetchQuotes(requested_amount));
});

//export router
module.exports = router;