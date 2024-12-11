import React from "react";
import RegistrationPage from "./Registration";
import { UserProvider } from "../context/UserContext";
import { MemoryRouter } from "react-router-dom";

describe("<RegistrationPage />", () => {
  beforeEach(() => {
    cy.mount(
      <UserProvider>
        <MemoryRouter initialEntries={["/register"]}>
          <RegistrationPage />
        </MemoryRouter>
      </UserProvider>
    );
  });
  it("should render", () => {
    cy.get("#patient-button").should("exist");
    cy.get("#doctor-button").should("exist");
  });

  describe("Patient Registration", () => {
    beforeEach(() => {
      cy.get("#patient-button").click();
    });

    it("should reach patient page", () => {
      cy.get("#user-greeting").contains("Patient");
    });

    it("should fuck off", () => {
      cy.get("#name").type("Amazing Slotter");
      cy.get("#email").type("amazing1@slotter.com");
      cy.get("#password").type("Amazing@1");
      cy.get("#confirm-password").type("Amazing@1");
    });
  });

  // xdescribe("Doctor Registration", () => {
  //   beforeEach(() => {
  //     cy.get("#doctor-button").click();
  //   });

  //   it("should reach doctor page", () => {
  //     cy.get("#user-greeting").contains("Doctor");
  //   });
  // });
});
