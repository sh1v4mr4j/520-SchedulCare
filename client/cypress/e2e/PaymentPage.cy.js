describe("Payment page", () => {
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
    cy.visit("/patient?test=edsnowden@mbbs.com");
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

  it("subscribes with paypal", () => {
    cy.visit("/patient");
    cy.contains("Patient Form").should("be.visible");
    cy.get("#checkAvailability").click();

    cy.get("#scheduleAppointment").click();

    // Verify payments flow
    cy.paypalFlow("<your-sandbox-email-id>", "<pwd>");
    cy.contains("Close").should("be.visible");

    cy.get("#close").click();
    cy.wait(2000);

    // After successful completion
    // Verify if redirected to Patient page
    cy.contains("Patient Form").should("be.visible");
  });
});
