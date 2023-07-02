export function findProduct(productName) {
  cy.get(".mat-grid-list").then((body) => {
    if (body.find(`.item-name:contains(${productName})`).length > 0) {
      cy.get(`.item-name:contains(${productName})`).click();
    } else {
      cy.get('[aria-label="Next page"]').click();
      findProduct(productName);
    }
  });
}

export function headlessSignup(user) {
  cy.request({
    method: "POST",
    url: "https://juice-shop-sanitarskyi.herokuapp.com//api/Users",
    body: {
      email: user.email,
      password: user.password,
      passwordRepeat: user.password,
      securityQuestion: {
        id: 7,
        question: "Name of your favorite pet?",
      },
      securityAnswer: user.answer,
    },
  }).then((response) => {
    expect(response.status).to.be.equal(201);

    const userId = response.body.id;

    cy.request({
      method: "POST",
      url: "https://juice-shop-sanitarskyi.herokuapp.com/api/SecurityAnswers",
      body: {
        UserId: userId,
        answer: user.answer,
        SecurityQuestionId: 7,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(201);
    });
  });
}

export function headlessLogin(user) {
  cy.log(`Auth user with email: ${user.email} and password: ${user.password}`);

  cy.request({
    method: "POST",
    url: "https://juice-shop-sanitarskyi.herokuapp.com/rest/user/login",
    body: {
      email: user.email,
      password: user.password,
    },
  }).then((response) => {
    console.log(response);
    expect(response.status).to.be.equal(200);
    let token = response.body.authentication.token;
    let bid = response.body.authentication.bid;
    cy.setCookie("token", token);
    window.localStorage.setItem("token", token);
    window.sessionStorage.setItem("bid", bid);
  });
}
