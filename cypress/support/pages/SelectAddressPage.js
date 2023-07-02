///<reference types = "cypress"/>

class SelectAddressPage {
  getAddAddressButton() {
    return cy.get('[aria-label="Add a new address"]');
  }

  getContinueButton() {
    return cy.get('[aria-label="Proceed to payment selection"]');
  }

  getSelectRadioButton() {
    return cy.get("mat-radio-button");
  }
}
export default new SelectAddressPage();
