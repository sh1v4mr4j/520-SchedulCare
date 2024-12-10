import { PaymentForm } from "./PaymentForm";
import { UserProvider } from "../context/UserContext";
import { BrowserRouter } from "react-router-dom";

Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});

describe("PaymentForm Component", () => {
  beforeEach(() => {
    const mockUser = {
      email: "testuser@example.com",
    };

    // Mock the order creation API
    cy.intercept("POST", "payment/orders", {
      statusCode: 200,
      body: JSON.stringify({ id: "mock-order-id" }),
    }).as("createOrder");

    cy.intercept("POST", "orders/{order_id}/capture", {
      statusCode: 200,
      body: JSON.stringify({
        purchase_units: [
          {
            payments: {
              captures: [
                {
                  status: "COMPLETED",
                  id: "mock-capture-id",
                  amount: { value: "1100.00" },
                },
              ],
            },
          },
        ],
      }),
    }).as("capturePayment");

    cy.mount(
      <BrowserRouter>
        <UserProvider value={{ user: mockUser }}>
          <PaymentForm />
        </UserProvider>
      </BrowserRouter>
    );
  });

  // Test if paypal page loads correctly
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

  // Load modal successfully
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

  // Modal on failed transaction
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

  it("Validate paypal button on click", () => {
    cy.get("iframe").iframe().find('div[data-funding-source="paypal"]').click();
  });
});
