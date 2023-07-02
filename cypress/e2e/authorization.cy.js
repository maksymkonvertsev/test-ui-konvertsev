/// <reference types="cypress"/>

import user from "../fixtures/user.json";
import LoginPage from "../support/pages/LoginPage";
import { headlessSignup } from "../support/helper";
import { faker } from "@faker-js/faker";

user.password = faker.internet.password({ length: 9 });
user.email = faker.internet.email();
user.answer = faker.animal.cat();

describe("Login", () => {
  before(() => {
    headlessSignup(user);
  });

  it("Login test", () => {
    LoginPage.visit();
    LoginPage.closeBanner().click();
    LoginPage.closeCookiesPopUp().click();
    LoginPage.submitLoginForm(user.email, user.password);
    cy.get('[aria-label="Show the shopping cart"]').should("be.visible");
  });
});
