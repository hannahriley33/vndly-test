describe('form completion and validation test', () => {
  before(() => {
    cy.visit('https://demoqa.com/automation-practice-form')
    cy.url()
      .should('eq', 'https://demoqa.com/automation-practice-form')
  })
  
  it('fills out the form', () => {
    const resumePdf = 'hriley_resume.pdf'
    
    cy.get('form').within(() => {
      cy.get('input[id="firstName"]')
        .click()
        .type('Hannah')
        
      cy.get('input[id="lastName"]')
        .click()
        .type('Riley')
      
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
        .type('{enter}')

      //bug in form
      cy.get('input[id="subjectsInput"]')
        .click()
        .type('Board games, reading')
        
      cy.get('input[type="checkbox"]')
        .should('have.id', 'hobbies-checkbox-1')
        .should('have.value', '1')
        .first()
        .check({force: true})
        
      cy.get('#currentAddress')
        .click()
        .type('123 Main St')
      
      cy.get('#uploadPicture').attachFile(resumePdf)
        
      cy.contains('Submit')
        .should('have.class', 'btn-primary')
        .click()
      }).screenshot('form-completed')
  })

  it('verifies the form', () => {
    cy.get('.modal-dialog').within(() => {
      cy.get('.modal-title')
        .should('have.text', 'Thanks for submitting the form')
        .should('have.id', 'example-modal-sizes-title-lg')
      
      cy.get('table')
        .should('have.class', 'table-dark')
        .should('have.class', 'table-striped').within(() => {
          cy.get('tr').eq(1)
            .should('contain', 'Student Name')
            .should('contain', 'Hannah Riley')
          cy.get('tr').eq(2)
            .should('contain', 'Student Email')
            .should('contain', 'riley.hannahm@gmail.com')
          cy.get('tr').eq(3)
            .should('contain', 'Gender')
            .should('contain', 'Female')
          cy.get('tr').eq(4)
            .should('contain', 'Mobile')
            .should('contain', '6508041083')
          cy.get('tr').eq(5)
            .should('contain', 'Date of Birth')
            .should('contain', '29 January,1994')
          cy.get('tr').eq(6)
            .should('contain', 'Subjects')
          cy.get('tr').eq(7)
            .should('contain', 'Hobbies')
            .should('contain', 'Sports')
          cy.get('tr').eq(8)
            .should('contain', 'Picture')
            .should('contain', 'hriley_resume.pdf')
          cy.get('tr').eq(9)
            .should('contain', 'Address')
            .should('contain', '123 Main St')
        })
    })
  })
})
