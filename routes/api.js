const express = require("express");
const router = express.Router();
const { quotes, fetchQuotes } = require("../assets/quotes");
const FETCH_LIMIT = 10;
//main route
router.get("/quotes", async (req, res) => {
  const quote = fetchQuotes(1);
  if (quote) return res.status(200).json(quote);
});

//fetching report route
router.get("/quotes/:amount", async (req, res) => {
  const requested_amount = Number(req.params.amount);
  if (isNaN(requested_amount)) {
    return res.status(400).send("Fetch limit has to a number!");
  } else {
    if (requested_amount <= FETCH_LIMIT) {
      const quotes = fetchQuotes(requested_amount);
      return res.status(200).json(quotes);
    } else return res.status(400).send("Fetch limit is 10 quotes per request!");
  }
});

//export router
module.exports = router;
