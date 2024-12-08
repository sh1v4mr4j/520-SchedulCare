import { PaymentForm } from "./PaymentForm";
import { UserProvider } from "../context/UserContext";
import { BrowserRouter } from "react-router-dom";

describe("PaymentForm Component", () => {
  beforeEach(() => {
    const mockUser = {
      email: "testuser@example.com",
    };

    cy.mount(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser }}>
          <PaymentForm />
        </UserProvider>
      </BrowserRouter>
    );
  });

  it("renders PayPal payment page", () => {
    cy.get('[data-testid="paypal-script-loading"]').should("not.exist");
    cy.get('[data-testid="paypal-button-container"]').should("be.visible");
  });

  it("displays the correct PayPal buttons", () => {
    it("Interacts with an iframe using XPath", () => {
      cy.xpath("/html/body/div/div/div/div/div/iframe[1]")
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap)
        .find("#paypal-buttons")
        .should("exist");

      cy.xpath("/html/body/div/div/div/div/div/iframe[1]")
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap)
        .find("#paypal-buttons")
        .should("have.id", "paypal-buttons");
    });
  });

  it("opens modal on successful transaction", () => {
    it("Interacts with Paypal buttons", () => {
      cy.xpath("/html/body/div/div/div/div/div/iframe[1]")
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap)
        .find(
          "#buttons-container > div > div.paypal-button-row.paypal-button-number-0.paypal-button-layout-vertical.paypal-button-number-multiple.paypal-button-env-sandbox.paypal-button-color-gold.paypal-button-text-color-black.paypal-logo-color-blue.paypal-button-shape-rect > div > div.paypal-button-label-container"
        )
        .should("exist")
        .click();

      cy.intercept("POST", "/payment", { statusCode: 200 }).as(
        "mockCapturePayment"
      );
      cy.wait("@mockCapturePayment").then(() => {
        cy.get(".modal-overlay").should("be.visible");
        cy.get(".modal-content").should("contain", "Transaction Successful");
      });
    });
  });

  it("opens modal on failed transaction", () => {
    it("Interacts with Paypal buttons", () => {
      cy.xpath("/html/body/div/div/div/div/div/iframe[1]")
        .its("0.contentDocument.body")
        .should("not.be.empty")
        .then(cy.wrap)
        .find(
          "#buttons-container > div > div.paypal-button-row.paypal-button-number-0.paypal-button-layout-vertical.paypal-button-number-multiple.paypal-button-env-sandbox.paypal-button-color-gold.paypal-button-text-color-black.paypal-logo-color-blue.paypal-button-shape-rect > div > div.paypal-button-label-container"
        )
        .should("exist")
        .click();

      // Mock a failed payment response (simulate failure in the payment capture process)
      cy.intercept("POST", "/payment", {
        statusCode: 400,
        body: {
          details: [
            {
              issue: "INSTRUMENT_DECLINED",
              description: "Your card was declined",
            },
          ],
          debug_id: "12345",
        },
      }).as("mockCapturePaymentFail");

      // Wait for the failed payment intercept to be triggered
      cy.wait("@mockCapturePaymentFail").then(() => {
        // Check that the modal is displayed with the correct error message
        cy.get(".modal-overlay").should("be.visible");
        cy.get(".modal-content").should("contain", "Transaction Failed");
        cy.get(".modal-content").should(
          "contain",
          "Sorry, your transaction could not be processed: Your card was declined"
        );
      });
    });
  });
});
