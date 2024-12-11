import RegistrationPage from "../../pages/Registration";

describe('<RegistrationPage />', () => {
    beforeEach(() => {
        cy.mount(<RegistrationPage />);
    })
    it('should render the registration form correctly', () => {
    //   cy.mount(<RegistrationPage />);
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should display an error for an invalid email', () => {
    //   cy.mount(<RegistrationPage />);
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid email').should('exist');
    });
  });
  