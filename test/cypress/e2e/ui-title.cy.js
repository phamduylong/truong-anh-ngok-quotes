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
    cy.get("#banner").should("have.text", "BLV ANH NGOK\'S API 🐰");
  });
});


