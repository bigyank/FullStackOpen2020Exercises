Cypress.Commands.add('Login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('Add', ({ username, password, name }) => {
  cy.request('POST', 'http://localhost:3000/api/users', {
    username,
    password,
    name,
  });
});

Cypress.Commands.add('AddBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3000/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});
