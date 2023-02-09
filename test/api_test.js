const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../server");
const { quotes } = require('../public/assets/quotes');
const should = chai.should();
const expect = chai.expect;
chai.use(chaihttp);




describe("/GET routes", () => {

  /*---------------------------------------------------------------------  GET ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Fetch All Quotes Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have.property("access-control-allow-origin").to.be.deep.equal("*");
        res.header.should.have.property("connection").to.be.deep.equal("Keep-Alive");
        res.header.should.have.property("keep-alive").to.be.deep.equal('timeout=5, max=1000');
        res.header.should.have.property("content-type").to.be.deep.equal('application/json; charset=utf-8');
        done();
      });
  });

  it("Fetch All Quotes Payload", (done) => {
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


/*---------------------------------------------------------------------  VALID LIMIT TEST   --------------------------------------------------------------------*/

  it("Fetch Amount Of Quotes Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/6")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have.property("access-control-allow-origin").to.be.deep.equal("*");
        res.header.should.have.property("connection").to.be.deep.equal("Keep-Alive");
        res.header.should.have.property("keep-alive").to.be.deep.equal('timeout=5, max=1000');
        res.header.should.have.property("content-type").to.be.deep.equal('application/json; charset=utf-8');
        done();
      });
  });

  it("Fetch Amount Of Quotes Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/6")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have.property("data").to.be.an("array").to.have.lengthOf(6);
        done();
      });
  });



/*---------------------------------------------------------------------  UPPER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/

  it("Fetch More Quotes Than Allowed Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/13")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.header.should.have.property("access-control-allow-origin").to.be.deep.equal("*");
        res.header.should.have.property("connection").to.be.deep.equal("Keep-Alive");
        res.header.should.have.property("keep-alive").to.be.deep.equal('timeout=5, max=1000');
        res.header.should.have.property("content-type").to.be.deep.equal('application/json; charset=utf-8');
        res.body.should.be.an("object");
        done();
      });
  });

  it("Fetch More Quotes Than Allowed Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/17")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });



  /*---------------------------------------------------------------------  LOWER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/
    

  it("Fetch Less Quotes Than Allowed Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-15")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.header.should.have.property("access-control-allow-origin").to.be.deep.equal("*");
        res.header.should.have.property("connection").to.be.deep.equal("Keep-Alive");
        res.header.should.have.property("keep-alive").to.be.deep.equal('timeout=5, max=1000');
        res.header.should.have.property("content-type").to.be.deep.equal('application/json; charset=utf-8');
        res.body.should.be.an("object");
        done();
      });
  });

  it("Fetch Less Quotes Than Allowed Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-12")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch amount has to be larger than 0 and less than or equal to 10!");
        done();
      });
  });






  /*---------------------------------------------------------------------  INVALID PARAMETER TEST   --------------------------------------------------------------------*/

  it("Fetch With Invalid Text Param Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/foo")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.header.should.have.property("access-control-allow-origin").to.be.deep.equal("*");
        res.header.should.have.property("connection").to.be.deep.equal("Keep-Alive");
        res.header.should.have.property("keep-alive").to.be.deep.equal('timeout=5, max=1000');
        res.header.should.have.property("content-type").to.be.deep.equal('application/json; charset=utf-8');
        res.body.should.be.an("object");
        done();
      });
  });

  it("Fetch With Invalid Text Param Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/bar")
      .end((err, res) => {
        res.should.be.an("object").to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have.property("error").to.deep.equal("Fetch amount has to be a number!");
        done();
      });
  });


});
