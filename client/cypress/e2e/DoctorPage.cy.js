describe("Doctor Page - End-to-End Tests", () => {
    const doctorEmail = "amazing@slotter.com"; // Define the email to test
    const doctorPassword = "Amazing@1"; // Replace with the actual password
    const role = "Doctor"; // Define the role for login
  
    const doctor = {
      name: "Amazing Slotter",
      email: doctorEmail,
      specialization: "Chest",
      pincode: 1002,
    };
  
    beforeEach(() => {
      // Log in once before running all tests
      cy.visit("/login?test=true");
  
      // Select the role
      cy.get("input[role='combobox']").click(); // Open the dropdown
      cy.get(".ant-select-dropdown").contains(role).click(); // Select the doctor role
  
      // Log in as the doctor
      cy.get("input[id='login_email']").type(doctorEmail); // Adjust selector as needed
      cy.get("input[id='login_password']").type(doctorPassword); // Adjust selector as needed
      cy.get("button[type='submit']").click(); // Adjust selector as needed
  
      // Ensure login is successful by checking if redirected to a valid page
      cy.url().should("not.include", "/login");
    });
  
    it("should log in and display correct doctor details when the page loads", () => {
  
      // Ensure only the specific card containing doctor details is targeted
      cy.get(".ant-card-body")
        .contains(`Name: ${doctor.name}`)
        .closest(".ant-card-body") // Ensure you're scoping the correct card
        .within(() => {
          // Verify the doctor details with specific values
          cy.contains(`Name: ${doctor.name}`).should("be.visible");
          cy.contains(`Email: ${doctorEmail}`).should("be.visible"); // Use the variable here
          cy.contains(`Specialisation: ${doctor.specialization}`).should(
            "be.visible"
          );
          cy.contains(`Pincode: ${doctor.pincode}`).should("be.visible");
        });
    });
  
    it("should allow the user to select a date range", () => {
      const startDate = "2024-12-10";
      const endDate = "2024-12-15";
      // Select the date range
      cy.get(".ant-picker-range").click(); // Click the range picker
      cy.get(".ant-picker-cell-inner").contains("10").click(); // Select start date
      cy.get(".ant-picker-cell-inner").contains("15").click(); // Select end date
  
      // Verify the selected date range is displayed
      cy.get(".ant-picker-input input").first().should("have.value", startDate);
      cy.get(".ant-picker-input input").last().should("have.value", endDate);
    });
  
    it("should save availability with valid inputs", () => {
      const startDate = "2024-12-10";
      const endDate = "2024-12-15";
  
      // Wait for the doctor details to be displayed
      cy.get(".ant-card-body", { timeout: 10000 }).should(
        "contain.text",
        "Name:"
      );
  
      // Select the date range
      cy.get(".ant-picker-range").click(); // Click the range picker
      cy.get(".ant-picker-cell-inner").contains("10").click(); // Select start date
      cy.get(".ant-picker-cell-inner").contains("15").click(); // Select end date
  
      // Save availability
      cy.get("button").contains("Save Availability").click();
  
      // Wait for the toast message confirming success
      cy.contains("Availability saved successfully!", { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });