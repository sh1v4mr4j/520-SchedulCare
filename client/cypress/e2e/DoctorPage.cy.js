describe("Doctor Page - End-to-End Tests", () => {
    beforeEach(() => {
      // Visit the doctor page (adjust the URL as per your application)
      cy.visit("/doctor?test=edsnowden@mbbs.com");
    });
  
    it("should display correct doctor details when the page loads", () => {
      // Ensure only the specific card containing doctor details is targeted
      cy.get(".ant-card-body")
        .contains("Name: Ed Snowden")
        .closest(".ant-card-body") // Ensure you're scoping the correct card
        .within(() => {
          // Verify the doctor details with specific values
          cy.contains("Name: Ed Snowden").should("be.visible");
          cy.contains("Email: edsnowden@mbbs.com").should("be.visible");
          cy.contains("Specialisation: Orthopedic").should("be.visible");
          cy.contains("Pincode: 112345").should("be.visible");
        });
    });
  
    it("should allow the user to select a date range and multiple time slots", () => {
      const startDate = "2024-12-10";
      const endDate = "2024-12-15";
      const timeSlots = ["9:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"];
  
      // Select the date range
      cy.get(".ant-picker-range").click(); // Click the range picker
      cy.get(".ant-picker-cell-inner").contains("10").click(); // Select start date
      cy.get(".ant-picker-cell-inner").contains("15").click(); // Select end date
  
      // Verify the selected date range is displayed
      cy.get(".ant-picker-input input").first().should("have.value", startDate);
      cy.get(".ant-picker-input input").last().should("have.value", endDate);
  
      // Select multiple time slots
      timeSlots.forEach((slot) => {
        cy.get(".ant-checkbox-group").contains(slot).click();
      });
  
      // Verify the selected time slots are highlighted
      timeSlots.forEach((slot) => {
        cy.get(".ant-checkbox-group")
          .contains(slot)
          .parent()
          .find(".ant-checkbox-checked")
          .should("exist");
      });
    });
  
    it("should save availability with valid inputs and multiple time slots", () => {
      const startDate = "2024-12-10";
      const endDate = "2024-12-15";
      const timeSlots = ["9:00 AM - 12:00 PM", "3:00 PM - 6:00 PM"];
  
      // Wait for the doctor details to be displayed
      cy.get(".ant-card-body", { timeout: 10000 }).should(
        "contain.text",
        "Name:"
      );
  
      // Select the date range
      cy.get(".ant-picker-range").click(); // Click the range picker
      cy.get(".ant-picker-cell-inner").contains("10").click(); // Select start date
      cy.get(".ant-picker-cell-inner").contains("15").click(); // Select end date
  
      // Select multiple time slots
      timeSlots.forEach((slot) => {
        cy.get(".ant-checkbox-group").contains(slot).click();
      });
  
      // Verify the selected time slots are highlighted
      timeSlots.forEach((slot) => {
        cy.get(".ant-checkbox-group")
          .contains(slot)
          .parent()
          .find(".ant-checkbox-checked")
          .should("exist");
      });
  
      // Save availability
      cy.get("button").contains("Save Availability").click();
  
      // Wait for the toast message confirming success
      cy.contains("Availability saved successfully!", { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });