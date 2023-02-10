const express = require("express");
const router = express.Router();
const { fetchQuotes, fetchAllQuotes, searchQuotes } = require("../public/assets/quotes");
const FETCH_LIMIT = 10;
//main route
router.get("/quotes", async (req, res) => {
  const all_quotes = fetchAllQuotes();
  
  if (all_quotes) {
    const return_obj = {status: 200, data: all_quotes}
    return res.status(200).json(return_obj);
  } else {
    return res.status(500).json({status: 500, error: "Server Internal Error. Please try again!"});
  }
});


router.get("/quotes/:amount([0-9]+)", async (req, res) => {
  const requested_amount = Number(req.params.amount);
  if (isNaN(requested_amount)) {
    return res.status(400).json({status: 400, error: "Fetch amount has to be a number!"});
  } else {
    if (requested_amount <= FETCH_LIMIT && requested_amount > 0) {
      const quotes = fetchQuotes(requested_amount);
      const return_obj = {status: 200, data: quotes};
      return res.status(200).json(return_obj);
    } else return res.status(400).json({status: 400, error: "Fetch amount has to be larger than 0 and less than or equal to 10!"});
  }
});

router.get("/quotes/search/:query?", async (req, res) => {
  const query = req.params.query;
  if(query) {
    return res.status(200).json({status: 200, data: searchQuotes(query)});
  }
  return res.status(400).json({status: 400, error: "Invalid search query!"});
})

//export router
module.exports = router;
