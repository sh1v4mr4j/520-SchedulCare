describe("Patient page", () => {
    it("should load the homepage", () => {
      cy.visit("/patient");
      cy.contains("Patient Form").should("be.visible");
    });
  });