/// <reference types="cypress"/>

import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";
import { headlessSignup, headlessLogin } from "../support/helper";
import HomePage from "../support/pages/HomePage";
import BasketPage from "../support/pages/BasketPage";
import SelectAddressPage from "../support/pages/SelectAddressPage";
import AdressPage from "../support/pages/AddressPage";
import DeliveryMethodPage from "../support/pages/DeliveryMethodPage";
import PaymentPage from "../support/pages/PaymentPage";
import OrderPage from "../support/pages/OrderSummary";

user.password = faker.internet.password({ length: 10 });
user.email = faker.internet.email();
user.answer = faker.animal.cat();

describe("Purchasing a juice", () => {
  before(() => {
    headlessSignup(user);
    headlessLogin(user);
  });

  it("Order", () => {
    HomePage.visit();
    HomePage.closeBanner().click();
    HomePage.closeCookiesPopUp().click();
    cy.get('[aria-label="Show the shopping cart"]').should("be.visible");

    let product = "Strawberry Juice (500ml)";
    cy.log(`Order ${product}`);
    HomePage.getSearchButton().type(`${product}{enter}`);
    HomePage.getAddToCartButton().click();
    cy.get(".fa-layers-counter").should("contain", "1");

    HomePage.getOpenCartButton().click();

    cy.get("mat-cell.mat-column-product").should("contain", `${product}`);

    BasketPage.getCheckoutButton().click();

    SelectAddressPage.getAddAddressButton().click();

    let country = faker.location.country();
    let name = faker.person.firstName();
    let mobile = faker.phone.number("3######");
    let zip = faker.location.zipCode("#####");
    let address = faker.location.streetAddress();
    let city = faker.location.city();
    let state = faker.location.state();

    cy.log(
      `Add new address ${country}, ${name}, ${mobile}, ${zip}, ${address}, ${city}, ${state}`
    );

    AdressPage.submitNewAdress(
      country,
      name,
      mobile,
      zip,
      address,
      city,
      state
    );

    SelectAddressPage.getSelectRadioButton().last().click();

    SelectAddressPage.getContinueButton().click();

    DeliveryMethodPage.getDeliveryOptionStandartDelivery().click();

    DeliveryMethodPage.getContinueButton().click();

    let cardNumber = faker.finance.creditCardNumber("4### #### #### ####");
    let exprireMonth = faker.number.int({ min: 1, max: 12 }).toString();
    let expireYear = faker.number.int({ min: 2080, max: 2099 }).toString();

    PaymentPage.getAddNewCardButton().click();

    cy.log(
      `Add new card ${name}, ${cardNumber}, ${exprireMonth}, ${expireYear}`
    );

    PaymentPage.addNewCard(name, cardNumber, exprireMonth, expireYear);

    PaymentPage.getCardOption().last().click();

    PaymentPage.getContinueButton().click();

    OrderPage.getPurchaseButton().click();

    cy.get("h1.confirmation")
      .should("contain", "Thank you for your purchase!")
      .and("have.css", "color", "rgb(104, 159, 56)");
  });
});
