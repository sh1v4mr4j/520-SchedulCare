describe("Payment page", () => {
  const patientEmail = "shivam@adarsh.com"; // Define the email to test
  const patientPassword = "Raaj@123"; // Replace with the actual password
  const role = "Patient"; // Define the role for login

  const patient = {
    name: "Shivam",
    email: patientEmail,
  };

  beforeEach(() => {
    cy.visit("/patient?test=edsnowden@mbbs.com");
    // Log in once before running all tests
    cy.visit("/login?test=true");

    // Select the role
    cy.get("input[role='combobox']").click(); // Open the dropdown
    cy.get(".ant-select-dropdown").contains(role).click(); // Select the role

    // Log in as the patient

    // Input email
    cy.get("input[id='login_email']").type(patientEmail); // Adjust selector as needed

    // Input passoword
    cy.get("input[id='login_password']").type(patientPassword); // Adjust selector as needed
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

    // Replace email password below with your sandbox payment account
    cy.paypalFlow("<your email>", "<your-pass>");
    cy.contains("Close").should("be.visible");

    cy.get("#close").click();
    cy.wait(2000);

    // After successful completion
    // Verify if redirected to Patient page
    cy.contains("Patient Form").should("be.visible");
  });
});
