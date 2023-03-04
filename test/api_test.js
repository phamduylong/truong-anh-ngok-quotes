const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../server");
const { quotes, searchQuotes } = require("../public/assets/quotes.ts");
const should = chai.should();
chai.use(chaihttp);

describe("Get Requests Headers Test", () => {
  /*---------------------------------------------------------------------  GET ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Fetch All Quotes Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        done();
      });
  });

  /*---------------------------------------------------------------------  VALID LIMIT TEST   --------------------------------------------------------------------*/

  it("Fetch Amount Of Quotes Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/6")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        done();
      });
  });

  /*---------------------------------------------------------------------  UPPER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/

  it("Fetch More Quotes Than Allowed Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/13")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  LOWER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/

  it("Fetch Less Quotes Than Allowed Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-15")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(404);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("text/html; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  INVALID PARAMETER TEST   --------------------------------------------------------------------*/

  it("Fetch With Invalid Text Param Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/foo")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(404);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("text/html; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  VALID SEARCH QUERY TEST   --------------------------------------------------------------------*/

  it("Fetch With Valid Search Query Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/em")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  INVALID QUERY TEST   --------------------------------------------------------------------*/

  it("Fetch With Dummy Query Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/somedummytext")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  EMPTY SEARCH QUERY TEST   --------------------------------------------------------------------*/

  it("Fetch With Empty Search Query Headers", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.header.should.have
          .property("access-control-allow-origin")
          .to.be.deep.equal("*");
        res.header.should.have
          .property("content-type")
          .to.be.deep.equal("application/json; charset=utf-8");
        res.body.should.be.an("object");
        done();
      });
  });
});

describe("Get Requests Payload Test", () => {
  /*---------------------------------------------------------------------  GET ALL QUOTES TEST   --------------------------------------------------------------------*/
  it("Fetch All Quotes Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have
          .property("data")
          .to.be.an("array")
          .to.have.lengthOf(quotes.length);
        done();
      });
  });

  /*---------------------------------------------------------------------  VALID LIMIT TEST   --------------------------------------------------------------------*/
  it("Fetch Amount Of Quotes Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/6")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have
          .property("data")
          .to.be.an("array")
          .to.have.lengthOf(6);
        done();
      });
  });

  /*---------------------------------------------------------------------  UPPER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/
  it("Fetch More Quotes Than Allowed Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/17")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have
          .property("error")
          .to.deep.equal(
            "Fetch amount has to be larger than 0 and less than or equal to 10!"
          );
        done();
      });
  });

  /*---------------------------------------------------------------------  LOWER LIMIT EXCEEDED TEST   --------------------------------------------------------------------*/
  it("Fetch Less Quotes Than Allowed Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/-12")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  INVALID PARAMETER TEST   --------------------------------------------------------------------*/
  it("Fetch With Invalid Text Param Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/bar")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(404);
        res.body.should.be.an("object");
        done();
      });
  });

  /*---------------------------------------------------------------------  VALID SEARCH QUERY TEST   --------------------------------------------------------------------*/
  it("Fetch With Valid Search Query Headers Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/em")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have.property("data").to.deep.equal(searchQuotes("em"));
        done();
      });
  });

  /*---------------------------------------------------------------------  INVALID QUERY TEST   --------------------------------------------------------------------*/

  it("Fetch With Dummy Query Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/somedummytext")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(200);
        res.body.should.have.property("data").to.deep.equal([]);
        done();
      });
  });

  /*---------------------------------------------------------------------  EMPTY SEARCH QUERY TEST   --------------------------------------------------------------------*/
  it("Fetch With Empty Search Query Headers Payload", (done) => {
    chai
      .request(app)
      .get("/api/quotes/search/")
      .end((err, res) => {
        res.should.be
          .an("object")
          .to.include.all.keys("body", "headers", "status");
        res.should.have.status(400);
        res.body.should.be.an("object");
        res.body.should.have.property("status").to.deep.equal(400);
        res.body.should.have
          .property("error")
          .to.deep.equal("Invalid search query!");
        done();
      });
  });
});
