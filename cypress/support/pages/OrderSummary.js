///<reference types = "cypress"/>

class OrderPage {
  getPurchaseButton() {
    return cy.get('[aria-label="Complete your purchase"]');
  }
}
export default new OrderPage();
