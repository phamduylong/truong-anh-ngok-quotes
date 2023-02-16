describe("Page Contain Title", () => {
  it("Correct Title", () => {
    cy.visit("https://blv-anh-ngok-said.onrender.com/");
    cy.contains("BLV ANH NGOK");
  });
});

describe("Landing Page Anchors", () => {
  it("Should Contain 8 Anchors", () => {
    cy.visit("https://blv-anh-ngok-said.onrender.com/");
    cy.get("a")
      .should("not.be.empty")
      .and(($a) => {
        // should have found 8 elements
        expect($a).to.have.length(8);
      });
  });

  it("Should Contain 5 API Anchors", () => {
    cy.visit("http://localhost:5173");
    cy.get(".api-link")
      .should("not.be.empty")
      .and(($a) => {
        // should have found 5 elements
        expect($a).to.have.length(5);

        const hrefs = $a.map((idx, elem) => {
          return Cypress.$(elem).attr('href');
        });

        expect(hrefs.get()).to.deep.eq([
          "/api/quotes",
          "/api/quotes/3",
          "/api/quotes/15",
          "/api/quotes/search/em",
          "/api/quotes/search/"
        ]);
      });
  });
});

describe("Code Boxes Should Not Be Empty", () => {
  it("Should Not Be Empty", () => {
    cy.get('code').should('not.be.empty');
  })
})
