describe("Map view page", () => {
  beforeEach(() => {
    cy.visit("/mapview");
  });

  describe("Location Search", () => {
    beforeEach(() => {
      cy.visit("/mapview/location-search");
    });

    it("should check if the page is loaded", () => {
      cy.get("#search")
        .should("exist")
        .and("be.visible")
        .and("be.empty")
        .and("not.be.disabled");
    });

    it("should search for a specific location", () => {
      cy.visit("/mapview/location-search");
      cy.get("#search").type("New York");

      // Press enter to search
      cy.get("#search").type("{enter}");
    });
  });

  describe("Get directions", () => {
    beforeEach(() => {
      cy.visit("/mapview/directions");
    });

    it("should check if the page is loaded", () => {
      cy.get("#source")
        .should("exist")
        .and("be.visible")
        .and("be.empty")
        .and("not.be.disabled");

      cy.get("#destination")
        .should("exist")
        .and("be.visible")
        .and("be.disabled");
    });

    it("should set a source", () => {
      cy.get("#source")
        .type("The Boulders Amherst")
        .trigger("keydown", { keyCode: 13 });

      // Wait for the search results
      cy.get('[plus_code="8J98FXC+JC"]', { timeout: 10000 })
        .should("be.visible")
        .trigger("click")
        .then(() => {
          cy.get("#destination").should("not.be.disabled");
        });

      // Set a destination - plus_code="8J99FVF+RH"
      cy.get("#destination")
        .type("Arnold House Amherst")
        .trigger("keydown", { keyCode: 13 });

      // Wait for the search results
      cy.get('[plus_code="8J99FVF+RH"]', { timeout: 10000 })
        .should("be.visible")
        .trigger("click");
    });
  });
});
