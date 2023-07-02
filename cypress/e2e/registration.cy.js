import { faker } from "@faker-js/faker";
import user from "../fixtures/user.json";

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 20 });

describe("Registration Test", () => {
  it("should register a new user", () => {
    cy.log("visiting a homepage");
    cy.visit("/");
    cy.get(".cc-btn.cc-dismiss").click();
    cy.contains("Dismiss").click();
    cy.log("registring a new user");
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
    cy.get("#newCustomerLink").click();
    cy.get("[aria-label='Email address field']").type(user.email);
    cy.get("[type='password']").eq(0).type(user.password);
    cy.get("[type='password']").eq(1).type(user.password);
    cy.get(".mat-slide-toggle-thumb").click();
    cy.get(".mat-select").click();
    cy.contains("Mother's birth date? (MM/DD/YY)").click();
    cy.get("#securityAnswerControl").type(user.birthDate);
    cy.get("#registerButton").should("not.be.disabled").click();

    cy.log("verifying user is redirected to a login page");
    cy.request("/login").then((resp) => {
      expect(resp.status).to.eq(200);
    });
  });
});
