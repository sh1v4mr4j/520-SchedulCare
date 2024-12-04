import AddressSetter from "./AddressSetter";

const enterKey = { keyCode: 13 };
let onLocationChangeMock;

describe("<Address Setter />", () => {
  beforeEach(() => {
    onLocationChangeMock = cy.stub().as("onLocationChange");
    cy.mount(<AddressSetter setSelectedLocation={onLocationChangeMock} />);
  });

  it("should render a search input", () => {
    cy.get("#search").should("be.visible");
  });

  it("should check if the page is loaded", () => {
    cy.get("#search")
      .should("exist")
      .and("be.visible")
      .and("be.empty")
      .and("not.be.disabled");
  });

  it("should search for a specific location", () => {
    cy.get("#search").type("New York");

    // Press enter to search
    cy.get("#search").trigger("keydown", enterKey);
  });

  it("should set a location on the map", () => {
    cy.get("#search").type("The Boulders Amherst");

    // Press enter to search
    cy.get("#search").trigger("keydown", enterKey);

    // Set a destination - plus_code="8J99FVF+RH"
    const plusCode = "8J98FXC+JC";
    cy.get(`[plus_code="${plusCode}"]`, { timeout: 10000 })
      .should("be.visible")
      .trigger("click")
      .then(() => {
        cy.get("@onLocationChange").should("be.calledOnce");
        cy.get("@onLocationChange").then((value) => {
          expect(value.args[0][0].plus_code).to.equal(plusCode);
        });
      });
  });
});
