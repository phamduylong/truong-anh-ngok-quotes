
beforeEach(() => {
  cy.visit("/");
});

describe("Page Contain Title", () => {
  it("Correct Title", () => {
    cy.title().should("be.deep.eq", "Anh Ngok's API");
  });
});

describe("Page Contain Banner", () => {
  it("Correct Banner", () => {
    cy.get("#banner").should("have.text", "BLV ANH NGOK'S API 🐰");
  });
});

describe("Landing Page Anchors", () => {
  it("Should Contain 8 Anchors", () => {
    cy.get("a")
      .should("not.be.empty")
      .and(($a) => {
        expect($a).to.have.length(8);
      });
  });

  it("Should Contain 5 API Anchors", () => {
    cy.get(".api-link")
      .should("not.be.empty")
      .and(($a) => {
        expect($a).to.have.length(5);

        const hrefs = $a.map((idx, elem) => {
          return Cypress.$(elem).attr("href");
        });

        expect(hrefs.get()).to.deep.eq([
          "/api/quotes",
          "/api/quotes/3",
          "/api/quotes/15",
          "/api/quotes/search/em",
          "/api/quotes/search/",
        ]);
      });
  });
});

describe("Code Boxes Should Not Be Empty", () => {
  it("Should Contain 5 Code Boxes", () => {
    cy.get("code")
      .should("not.be.empty")
      .and(($c) => {
        expect($c).to.have.length(5);
      });
  });

  it("Code Boxes Should Never Be Empty", () => {
    cy.get("code")
      .should("not.be.empty")
      .and(($c) => {
        const boxes_content = $c.map((box) => {
          return Cypress.$(box).innerText;
        });

        boxes_content.get().forEach((box) => {
          expect(box).to.not.be.empty();
        });
      });
  });
});
