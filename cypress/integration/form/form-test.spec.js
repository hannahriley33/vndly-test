describe('form test', () => {
  //think about this it statement
  it('users should be able to fill out form and grab screenshot', () => {
    const resumePic = 'hriley_resume.pdf'
    
    before(() => {
      cy.visit('https://demoqa.com/automation-practice-form')
      cy.url().should('eq', 'https://demoqa.com/automation-practice-form')
    })

    cy.get('form').within(() => {
      //cypress best practices say not to grab by id.
        //should('have.text', 'First Name') doesn't work. why??
        //should I add another assertion here?
      cy.get('input[id="firstName"]')
        .click()
        .type('Hannah')
        //add assertion here or is this implicit assertion?
      cy.get('input[id="lastName"]')
        .click()
        .type('Riley')
        //add assertion here?
      cy.get('input[id="userEmail"]')
        .click()
        .type('riley.hannahm@gmail.com')

      cy.get('[type="radio"]')
        .check("Female", { force: true })      
        .should('have.id', 'gender-radio-2')
        .should('have.class', 'custom-control-input') 
      
      cy.get('input[id="userNumber"]')
        .click()
        .type('6508041083')

      cy.get('input[id="dateOfBirthInput"]')
        .click()
        .type('{selectall}')
        .type('01/29/94')

      cy.get('.subjects-auto-complete__value-container')
        .click({force: true})
        .type('Fun activities')
      
      
        cy.get('input[type="checkbox"]')
        .should('have.id', 'hobbies-checkbox-1')
        .should('have.value', '1')
        .first()
        .check({force: true})
        

        cy.get('#currentAddress')
          .click()
          .type('123 Main St')

        cy.get('css-1uccc91-singleValue')
          .should('have.text', 'Haryana')
          .click()
          

        cy.get('#uploadPicture').attachFile(resumePic)

        cy.contains('Submit')
          .should('have.class', 'btn-primary')
          .click()
    })
    cy.get('.modal-dialog').within(() => {
      cy.get('.modal-title')
        .should('have.text', 'Thanks for submitting the form')
        .should('have.id', 'example-modal-sizes-title-lg')
      
    }).screenshot()
  })
})