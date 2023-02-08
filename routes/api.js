const express = require("express");
const router = express.Router();
const { quotes, fetchQuotes } = require("../public/assets/quotes");
const FETCH_LIMIT = 10;
//main route
router.get("/quotes", async (req, res) => {
  const quote = fetchQuotes(1);
  
  if (quote) {
    const return_obj = {status: 200, data: quote}
    return res.status(200).json(return_obj);
  } else {
    return res.status(500).json({error: "Server Internal Error. Please try again!"});
  }
});


router.get("/quotes/:amount", async (req, res) => {
  const requested_amount = Number(req.params.amount);
  if (isNaN(requested_amount)) {
    return res.status(400).json({error: "Fetch limit has to a number!"});
  } else {
    if (requested_amount <= FETCH_LIMIT && requested_amount > 0) {
      const quotes = fetchQuotes(requested_amount);
      const return_obj = {status: 200, data: quotes}
      return res.status(200).json(return_obj);
    } else return res.status(400).json({error: "Fetch amount has to be larger than 0 and less than or equal to 10!"});
  }
});

//export router
module.exports = router;
