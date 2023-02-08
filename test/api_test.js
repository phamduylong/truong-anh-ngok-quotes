const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../server");
const { quotes } = require('../public/assets/quotes');
const should = chai.should();
const expect = chai.expect;
chai.use(chaihttp);

describe("/GET routes", () => {
  it("Fetch All Quotes", (done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have.property("data").to.be.an("array").to.have.lengthOf(quotes.length);
        done();
      });
  });

  it("Fetch Some Quotes In Limit", (done) => {
    chai
    .request(app)
    .get("/api/quotes/7")
    .end((err, res) => {
      res.should.be.an("object").to.include.all.keys("body", "headers", "status");
      res.should.have.status(200);
      res.body.should.be.an("object");
      res.body.should.have.property("status").to.deep.equal(200);
      res.body.should.have.property("data").to.be.an("array").to.have.lengthOf(7);
      done();
      });
  });

  it("Fetch More Quotes Than Allowed", (done) => {
    chai
      .request(app)
      .get("/api/quotes/13")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });

  it("Fetch Less Quotes Than Allowed", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-9")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });

  it("Fetch With Invalid Param", (done) => {
    chai
      .request(app)
      .get("/api/quotes/doomed")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch limit has to be a number!");
        done();
      });
  });


});
