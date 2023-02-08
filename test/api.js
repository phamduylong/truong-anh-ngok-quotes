const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../server");
const { quotes } = require('../public/assets/quotes');
const should = chai.should();
const expect = chai.expect;
chai.use(chaihttp);

describe("/GET quotes", () => {
  it("Get All Quotes", (done) => {
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
});
