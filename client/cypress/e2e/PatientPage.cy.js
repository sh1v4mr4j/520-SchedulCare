describe("PatientForm Component", () => {
  const patientEmail = "shivam@adarsh.com"; // Define the email to test
  const patientPassword = "Raaj@123"; // Replace with the actual password
  const role = "Patient"; // Define the role for login

  const patient = {
    name: "Shivam",
    email: patientEmail,
  };

  beforeEach(() => {
    cy.visit("/patient?test=shivam@adarsh.com");
    // Log in once before running all tests
    cy.visit("/login?test=true");

    // Select the role
    cy.get("input[role='combobox']").click(); // Open the dropdown
    cy.get(".ant-select-dropdown").contains(role).click(); // Select the patient role

    // Log in as the patient

    // Input email
    cy.get("input[id='login_email']").type(patientEmail); // Adjust selector as needed

    // Input password
    cy.get("input[id='login_password']").type(patientPassword); // Adjust selector as needed
    cy.get("button[type='submit']").click(); // Adjust selector as needed

    // Ensure login is successful by checking if redirected to a valid page
    cy.url().should("not.include", "/login");
  });

  it("renders patient data correctly", () => {
    cy.wait(1000);
    cy.visit("/patient");

    // Check if patient data is displayed correctly
    cy.get("#patientname").should("contain", "LA"); // Replace with actual patient name
    cy.get("#dob").should("contain", "1992-12-30"); // Replace with actual DOB
    cy.get("#pin").should("contain", "112345"); // Replace with actual pincode
    cy.get("#gender").should("contain", "Male"); // Replace with actual gender
  });

  it("loads and displays doctors based on pincode", () => {
    cy.wait(500);
    cy.visit("/patient");
    cy.get("#doctorcard").should("exist"); // Adjust length based on mocked data
    cy.get("#doctorcard")
      .first()
      .should("contain", "Ed")
      .and("contain", "Orthopedic");
  });
});
