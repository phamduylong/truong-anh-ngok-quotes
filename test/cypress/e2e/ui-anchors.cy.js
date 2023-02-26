beforeEach(() => {
    cy.visit("/");
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
