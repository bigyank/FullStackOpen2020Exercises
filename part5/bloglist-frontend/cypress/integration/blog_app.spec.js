describe('Before Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/test/reset');
    cy.Add({ username: 'root', password: 'root', name: 'root' });
    cy.visit('http://localhost:3000');
  });

  it('front page contains blogs', function () {
    cy.contains('blogs');
  });

  it('login form is displayed', function () {
    cy.contains('Login').click();
  });

  it('valid user can be logged in', function () {
    cy.get('#togglable-btn').click();
    cy.get('#username').type('root');
    cy.get('#password').type('root');
    cy.get('#login-btn').click();

    cy.contains('root logged in');
  });

  it('cannot log invalid user', function () {
    cy.contains('Login').click();
    cy.get('#username').type('admin');
    cy.get('#password').type('password');
    cy.get('#login-btn').click();

    cy.get('.error')
      .should('contain', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('html').should('not.contain', 'root logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.Login({ username: 'root', password: 'root' });
    });

    it('A blog can be created', function () {
      cy.contains('Add Blog').click();
      cy.get('#title').type('test-title');
      cy.get('#author').type('test-author');
      cy.get('#url').type('test-url');
      cy.get('#addBlog-btn').click();

      cy.get('html').should('contain', 'test-title test-author');
    });

    describe('when a blog exists', function () {
      this.beforeEach(function () {
        cy.AddBlog({ title: 'title2', author: 'author2', url: 'url2' });
        cy.contains('Show').click();
      });

      it('blog can be liked', function () {
        cy.get('.detailInfo').as('blogInfo');
        cy.get('@blogInfo').contains('0');
        cy.get('@blogInfo').contains('like').click();
        cy.get('@blogInfo').contains('1');
      });

      it.only('can be deleted', function () {
        cy.contains('remove').click();
        cy.get('.success')
          .should('contain', 'blog removed sucessfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)');
      });
    });
  });
});
