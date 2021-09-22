const { clearCart, closeCart, goToProductPageByShelf, checkText } =
  require('@vtex/test-tools/dist/cypress').default

describe('Order flows', () => {
  beforeEach(() => {
    cy.visit('/')

    clearCart()
  })

  it('tests an item order and its checkout', () => {
    goToProductPageByShelf()

    cy.clickById('nextProductImage')

    cy.url().then((path) => {
      const itemURL = new URL(path)

      cy.clickById('addToCart', { force: true })
      cy.clickById('goCheckout')

      cy.url().should('include', '/checkout/#/cart')
      cy.get(`a[href="//${itemURL.host}${itemURL.pathname}"]`)
    })
  })

  it('tests an order with add to cart, 2 sku/3 qtd, description check and shipping simulation', () => {
    goToProductPageByShelf()

    cy.clickById('nextProductImage')

    cy.clickById('addToCart')

    checkText('minicartTitle', 'Count (1)')

    closeCart()

    cy.visit('/working-shirt/p?skuId=2000546').then(() =>
      cy.clickById('addToCart')
    )

    checkText('minicartTitle', 'Count (2)')

    cy.get('[data-testid="numericStepperPlus"]').eq(1).click()

    cy.get('[data-testid="goCheckout"]').should('be.enabled').click()

    cy.url().should('include', '/checkout/#/cart')
  })
})
