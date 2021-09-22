describe('check that PLP page is rendering', () => {
  before(() => {
    cy.visit('/')
  })
  it('checks PLP renders', () => {
    cy.getById('categoryLink').eq(0).click()
    cy.get('header').should('be.visible')
    cy.getById('productSummaryContainer')
    cy.scrollTo(0, '100%')
    cy.get('footer')
  })
})
