beforeEach(() => {
    cy.visit("/");
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