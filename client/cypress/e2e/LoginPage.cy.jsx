//Declaring the constants for the doctor and patient objects
const patient = {
  email: "rakshita22@patient.com",
  name: "rakshita22",
  dob: "2024-12-01T05:00:00.000Z",
  gender: "female",
  password: "Qwerty@1",
  appointments: [],
  address: {},
  secret: "DMDPKDCBEIJEHH3A32ZTWITIEKO4QWJI",
};

const doctor = {
  email: "rakhs@gmail.com",
  name: "John Doctor",
  specialisation: "ent",
  dob: "1999-01-11T05:00:00.000Z",
  gender: "female",
  password: "Qwerty@1",
  pincode: { $numberInt: "123456" },
  scheduledApointment: false,
  location: {},
  secret: "L653SK3I4DND5TPBNLHDF3OMCJP5YPZY",
};

//Describe block for the LoginPage component
describe("<LoginPage />", () => {
  beforeEach(() => {
    cy.visit("/login?test=true");

    // Create an intercept for MFA registration
    cy.intercept("POST", "/mfa/generateQrCode", {
      status: 200,
      body: {
        status_code: 200,
        body: { secret: "L653SK3I4DND5TPBNLHDF3OMCJP5YPZY" },
      },
    }).as("mfaRegister");

    // Create an intercept for verifying the OTP
    cy.intercept("POST", "/mfa/verifyOtp", {
      status: 200,
      body: { status_code: 200, message: "Success" },
    }).as("verifyOtp");
  });

  //Test case to check if the login page renders
  it("should render", () => {
    // Check if the login form and essential elements are present
    cy.get("h2").should("have.text", "Login");
    cy.get("#select-role").should("exist");
    cy.get("#login_email").should("exist");
    cy.get("#login_password").should("exist");
    cy.get("#login-button").should("exist");
  });

  //Describe block for the Patient Login
  describe("Patient Login", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    //Test case to check if a not registered patient can login
    it("should login a not registered patient", () => {
      cy.get("#select-role").click();
      cy.get(".ant-select-dropdown").should("be.visible"); // This checks if the dropdown is visible
      cy.get(".ant-select-dropdown").contains("Patient").click(); // Use .ant-select-dropdown as a more reliable selector
      cy.get("#login_email").type("rakshita@patient.com");
      cy.get("#login_password").type("Qwerty@1");

      cy.intercept("POST", "/patients/patientLogin", {
        status: 200,
        body: { status_code: 401, body: patient },
      }).as("loginPatient");

      //checking the current URL to compare after clicking the login button incase of login failure
      cy.url().then((url) => {
        cy.get("#login-button").click();
        cy.wait("@loginPatient");
        cy.url().should("eq", url);
      });
    });

    //Test case to check if a registered patient can login
    it("should login a registered patient", () => {
      cy.get("#select-role").click();
      cy.get(".ant-select-dropdown").should("be.visible"); // This checks if the dropdown is visible
      cy.get(".ant-select-dropdown").contains("Patient").click(); // Use .ant-select-dropdown as a more reliable selector
      cy.get("#login_email").type("rakshita@patient.com");
      cy.get("#login_password").type("Qwerty@1");

      cy.intercept("POST", "/patients/patientLogin", {
        status: 200,
        body: { status_code: 200, body: patient },
      }).as("loginPatient");

      //checking the otp verification to compare after clicking the login button incase of login success
      cy.get("#login-button")
        .click()
        .then(() => {
          cy.wait("@loginPatient");
          cy.get("#otp").type("123456");
          cy.get("#verify-otp").click();
        });
    });
  });

  //Describe block for the Doctor Login
  describe("Doctor Login", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    //Test case to check if a not registered doctor can login
    it("should login a not registered doctor", () => {
      cy.get("#select-role").click();
      cy.get(".ant-select-dropdown").should("be.visible"); // This checks if the dropdown is visible
      cy.get(".ant-select-dropdown").contains("Doctor").click(); // Use .ant-select-dropdown as a more reliable selector
      cy.get("#login_email").type("rakshita@doctor.com");
      cy.get("#login_password").type("Qwerty@1");

      cy.intercept("POST", "/doctors/doctorLogin", {
        status: 200,
        body: { status_code: 401, body: patient },
      }).as("loginDoctor");

      //checking the current URL to compare after clicking the login button incase of login failure
      cy.url().then((url) => {
        cy.get("#login-button").click();
        cy.wait("@loginDoctor");
        cy.url().should("eq", url);
      });
    });

    //Test case to check if a registered doctor can login
    it("should login a registered doctor", () => {
      cy.get("#select-role").click();
      cy.get(".ant-select-dropdown").should("be.visible"); // This checks if the dropdown is visible
      cy.get(".ant-select-dropdown").contains("Doctor").click(); // Use .ant-select-dropdown as a more reliable selector
      cy.get("#login_email").type("rakshita@doctor.com");
      cy.get("#login_password").type("Qwerty@1");

      cy.intercept("POST", "/doctors/doctorLogin", {
        status: 200,
        body: { status_code: 200, body: doctor },
      }).as("loginDoctor");

      //checking the otp verification to compare after clicking the login button incase of login success
      cy.get("#login-button")
        .click()
        .then(() => {
          cy.wait("@loginDoctor");
          cy.get("#otp").type("123456");
          cy.get("#verify-otp").click();
        });
    });
  });

  //Describe block for the Redirect to Registration
  describe("Redirect to Registration", () => {
    it("should redirect to registration page", () => {
      cy.get("#register-link").click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/register`);
    });
  });
});
