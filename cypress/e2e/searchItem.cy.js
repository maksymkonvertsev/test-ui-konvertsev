/// <reference types="cypress"/>
import user from "../fixtures/user.json";
import HomePage from "../support/pages/HomePage";
import { findProduct, headlessSignup, headlessLogin } from "../support/helper";
import { faker } from "@faker-js/faker";

user.password = faker.internet.password({ length: 10 });
user.email = faker.internet.email();
user.answer = faker.animal.cat();

describe("Search", () => {
  before(() => {
    headlessSignup(user);
    headlessLogin(user);
  });

  it("Search product", () => {
    HomePage.visit();
    cy.get('[aria-label="Show the shopping cart"]').should("be.visible");
    HomePage.closeBanner().click();
    HomePage.closeCookiesPopUp().click();

    let product = "OWASP Juice Shop Coaster (10pcs)";
    cy.log(`Search ${product}`);
    findProduct(product);
    cy.get("div h1").should("contain", product);

    HomePage.getReviewField().type(faker.commerce.productAdjective());
    HomePage.getSubmitReviewButton().click();
    cy.get(".mat-snack-bar-container").should(
      "contain",
      "You review has been saved"
    );
  });
});
