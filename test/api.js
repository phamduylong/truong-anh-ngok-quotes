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
        expect(res).to.be.json;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.have.lengthOf(quotes.length);
        done();
      });
  });

  it("Fetch Some Quotes In Limit", (done) => {
    chai
      .request(app)
      .get("/api/quotes/8")
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.have.lengthOf(8);
        done();
      });
  });

  it("Fetch More Quotes Than Allowed", (done) => {
    chai
      .request(app)
      .get("/api/quotes/13")
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("error");
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });

  it("Fetch Less Quotes Than Allowed", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-9")
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("error");
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });

  it("Fetch With Invalid Param", (done) => {
    chai
      .request(app)
      .get("/api/quotes/doomed")
      .end((err, res) => {
        expect(res).to.be.json;
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.should.have.property("error");
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Fetch limit has to be a number!");
        done();
      });
  });


});
