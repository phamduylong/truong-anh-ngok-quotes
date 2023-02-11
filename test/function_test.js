const chai = require("chai");
const {
  quotes,
  fetchQuotes,
  fetchAllQuotes,
  searchQuotes,
} = require("../public/assets/quotes");
const should = chai.should();

describe("Fetch Quotes Function Test", () => {
  /*---------------------------------------------------------------------  FETCH QUOTES TEST   --------------------------------------------------------------------*/
  it("Normal Fetch Use Case", (done) => {
    const amount = Math.floor(Math.random() * quotes.length);
    const res = fetchQuotes(amount);
    res.should.have.length(amount);
    done();
  });

  it("Fetch More Than Available Amount", (done) => {
    (() => fetchQuotes(quotes.length + 1)).should.throw(
      `Insufficient amount of quotes. Maximum is ${quotes.length}.`
    );
    done();
  });

  it("Duplicate Check Test", (done) => {
    const amount = Math.floor(Math.random() * quotes.length);
    const res = fetchQuotes(amount);
    res.should.have.length(amount);
    new Set(res).should.have.length(amount);
    done();
  });
});

describe("Fetch All Quotes Function Test", () => {
  /*---------------------------------------------------------------------  FETCH ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Fetch All Quotes Test", (done) => {
    const res = fetchAllQuotes();
    res.should.have.length(quotes.length);
    res.should.be.deep.equal(quotes);
    done();
  });
});

describe("Search Quotes Function Test", () => {
  /*---------------------------------------------------------------------  FETCH ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Search With Empty Query", (done) => {
    const res = searchQuotes("");
    res.should.have.length(quotes.length);
    done();
  });

  it("Search With Weird Query", (done) => {
    const res = searchQuotes("this should not be in any of the quotes");
    res.should.have.length(0);

    done();
  });

  it("Case Insensitive Test", (done) => {
    const case1 = searchQuotes("anh");
    const case2 = searchQuotes("AnH");
    const case3 = searchQuotes("aNH");
    const case4 = searchQuotes("ANH");
    case1.should.be.deep.equal(case2);
    case2.should.be.deep.equal(case3);
    case3.should.be.deep.equal(case4);
    done();
  });
});

describe("Quotes Array Test", () => {
  /*---------------------------------------------------------------------  FETCH ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Array Should Not Be Empty", (done) => {
    quotes.should.not.be.empty;
    done();
  });

  it("Every Quotes In Array Should Be String", (done) => {
    quotes.forEach((quote) => quote.should.be.a("string"));
    done();
  });
});
