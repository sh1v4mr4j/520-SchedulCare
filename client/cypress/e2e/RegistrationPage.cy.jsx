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

describe("<RegistrationPage />", () => {
  beforeEach(() => {
    cy.visit("/register?test=true");

    // Create an intercept for MFA registration
    cy.intercept("POST", "/mfa/generateQrCode", {
      status: 200,
      body: {
        status_code: 200,
        body: { secret: "L653SK3I4DND5TPBNLHDF3OMCJP5YPZY" },
      },
    }).as("mfaRegister");

    cy.intercept("POST", "/mfa/verifyOtp", {
      status: 200,
      body: { status_code: 200, message: "Success" },
    }).as("verifyOtp");
  });

  it("should render", () => {
    cy.get("#patient-button").should("exist");
    cy.get("#doctor-button").should("exist");
  });

  describe("Patient Registration", () => {
    beforeEach(() => {
      cy.get("#patient-button").click();
      cy.intercept("POST", "/patients/addPatient", {
        status: 200,
        body: { status_code: 200, body: patient },
      }).as("addPatient");
    });

    it("should reach patient page", () => {
      cy.get("#user-greeting").contains("Patient");
    });

    it("trying to register an already existing patient", () => {
      cy.get("#name").type("Amazing Slotter");
      cy.get("#email").type("amazing1@slotter.com");
      cy.get("#password").type("Amazing@1");
      cy.get("#confirm-password").type("Amazing@1");
      cy.get("#dob").type("2024-12-02");
      cy.get("#femalep").click();

      cy.intercept("POST", "/patients/addPatient", {
        status: 200,
        body: { status_code: 400, body: patient },
      }).as("addPatient");

      //checking the current URL to compare after clicking the register button incase of registration failure
      cy.url().then((url) => {
        cy.get("#register-button").click();
        cy.wait("@addPatient");
        cy.url().should("eq", url);
      });
    });
    it("trying to register a new patient", () => {
      cy.get("#name").type("Amazing Slotter");
      cy.get("#email").type("amazing1@slotter.com");
      cy.get("#password").type("Amazing@1");
      cy.get("#confirm-password").type("Amazing@1");
      cy.get("#dob").type("2024-12-02");
      cy.get("#femalep").click();

      //checking the otp verification to compare after clicking the register button incase of registration success
      cy.get("#register-button")
        .click()
        .then(() => {
          cy.wait("@addPatient");
          cy.get("#otp").type("123456");
          cy.get("#verify-otp").click();
        });
    });
  });

  describe("Doctor Registration", () => {
    beforeEach(() => {
      cy.get("#doctor-button").click();
      cy.intercept("POST", "/doctors/addDoctor", {
        status: 200,
        body: { status_code: 200, body: doctor },
      }).as("addDoctor");
    });

    it("should reach doctor page", () => {
      cy.get("#user-greeting").contains("Doctor");
    });

    it("trying to register an already existing doctor", () => {
      cy.get("#name").type("Amazing Slotter");
      cy.get("#email").type("amazing1@slotter.com");
      cy.get("#password").type("Amazing@1");
      cy.get("#confirm-password").type("Amazing@1");
      cy.get("#dob").type("1988-12-02");
      cy.get("#specialisation").type("ENT");
      cy.get("#male").click();
      cy.get("#address").type("123 Test Street");
      cy.get("#pincode").type("123456");

      cy.intercept("POST", "/doctors/addDoctor", {
        status: 200,
        body: { status_code: 400, body: doctor },
      }).as("addDoctor");

      //checking the current URL to compare after clicking the register button incase of registration failure
      cy.url().then((url) => {
        cy.get("#register-button").click();
        cy.wait("@addDoctor");
        cy.url().should("eq", url);
      });
    });
    it("trying to register a new doctor", () => {
      cy.get("#name").type("Amazing Slotter");
      cy.get("#email").type("amazing1@slotter.com");
      cy.get("#password").type("Amazing@1");
      cy.get("#confirm-password").type("Amazing@1");
      cy.get("#dob").type("1988-12-02");
      cy.get("#specialisation").type("ENT");
      cy.get("#male").click();
      cy.get("#address").type("123 Test Street");
      cy.get("#pincode").type("123456");

      //checking the otp verification to compare after clicking the register button incase of registration success
      cy.get("#register-button")
        .click()
        .then(() => {
          cy.wait("@addDoctor");
          cy.get("#otp").type("123456");
          cy.get("#verify-otp").click();
        });
    });
  });
});
