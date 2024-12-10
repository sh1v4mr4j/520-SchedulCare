// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-xpath";

Cypress.Commands.add("getIframeBody", (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .should("be.visible") // Ensure the iframe is visible
    .then(($iframe) => {
      const body = $iframe[0].contentDocument.body; // Access the body directly
      cy.wrap(body).should("not.be.empty"); // Ensure it's not empty
    });
});

Cypress.Commands.add("iframe", { prevSubject: "element" }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.ready(function () {
      resolve($iframe.contents().find("body"));
    });
  });
});

// Used to keep the reference to the popup window
const state = {};

/**
 * Intercepts calls to window.open() to keep a reference to the new window
 */
Cypress.Commands.add("capturePopup", () => {
  cy.window().then((win) => {
    const open = win.open;
    cy.stub(win, "open").callsFake((...params) => {
      // Capture the reference to the popup
      state.popup = open(...params);
      return state.popup;
    });
  });
});

/**
 * Returns a wrapped body of a captured popup
 */
Cypress.Commands.add("popup", () => {
  const popup = Cypress.$(state.popup.document);
  return cy.wrap(popup.contents().find("body"));
});

/**
 * Clicks on PayPal button and signs in
 */
Cypress.Commands.add("paypalFlow", (email, password) => {
  // Enable popup capture
  cy.capturePopup();
  // Click on the PayPal button inside PayPal's iframe
  cy.get("iframe").iframe().find('div[data-funding-source="paypal"]').click();
  // It will first inject a loader, wait until it changes to the real content
  cy.wait(5000); // Not recommended, but the only way I found to wait for the real content
  cy.popup().then(($body) => {
    // Check if we need to sign in
    if ($body.find("input#email").length) {
      cy.popup().find("input#email").clear().type("sb-hrgqe34257713@personal.example.com");
      // Click on the button in case it's a 2-step flow
      cy.popup().find("button:visible").first().click();
      cy.popup().find("input#password").clear().type(password);
      cy.popup().find("button#btnLogin").click();
    }
  });
  cy.wait(2000);
  cy.popup().find("button#btnLogin").should("not.exist");
  cy.wait(1000);
  cy.popup().find("#payment-submit-btn").should("exist").click();
});

/**
 * Returns the price shown in PayPal's summary
 */
Cypress.Commands.add("paypalPrice", () => {
  return cy.popup().find("span#totalWrapper");
});

/**
 * Completes PayPal flow
 */
Cypress.Commands.add("paypalComplete", () => {
  cy.popup().find("ul.charges").should("not.to.be.empty");
  cy.wait(1000);
  cy.popup().find("button.continueButton").click();
  cy.popup().find('input[data-test-id="continueButton"]').click();
});
