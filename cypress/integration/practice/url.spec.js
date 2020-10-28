describe('create and mark/unmark as favorite', () => {
  it('Signs a user in', () => {
    cy.visit('https://react-redux.realworld.io/#/login')
    cy.title().should('eq', 'Conduit')
    cy.location('protocol').should('eq', 'https:')
    cy.get('input[type="email"]').type('riley.hannahm@gmail.com')
    cy.get('input[type="password').type('!bluered')
    cy.get('.btn').contains('Sign in').should('be.visible').click()
  })

})