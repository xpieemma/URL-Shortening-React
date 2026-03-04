describe('URL Shortener E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('should load the landing page correctly', () => {
    cy.contains('More than just shorter links').should('be.visible');
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('should shorten a URL successfully', () => {
    cy.get('input[placeholder*="Shorten a link here"]').type('https://example.com');
    cy.contains('button', 'Shorten It!').click();
    
    cy.contains('https://example.com').should('be.visible');
    cy.contains('https://bit.ly').should('be.visible');
  });

  it('should show error for empty submission', () => {
    cy.contains('button', 'Shorten It!').click();
    cy.contains('Please add a link').should('be.visible');
  });

  it('should copy link to clipboard', () => {
    cy.get('input[placeholder*="Shorten a link here"]').type('https://example.com');
    cy.contains('button', 'Shorten It!').click();
    
    cy.contains('button', 'Copy').click();
    cy.contains('button', 'Copied!').should('be.visible');
    
    // Check clipboard (requires Cypress plugin)
    cy.window().then(win => {
      win.navigator.clipboard.readText().then(text => {
        expect(text).to.include('https://bit.ly');
      });
    });
  });

  it('should persist links after page reload', () => {
    // Shorten a URL
    cy.get('input[placeholder*="Shorten a link here"]').type('https://example.com');
    cy.contains('button', 'Shorten It!').click();
    cy.contains('https://example.com').should('be.visible');
    
    // Reload page
    cy.reload();
    
    // Link should still be there
    cy.contains('https://example.com').should('be.visible');
  });

  it('should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.get('.mobile-menu-btn').should('be.visible');
    
    // Test mobile menu
    cy.get('.mobile-menu-btn').click();
    cy.contains('Features').should('be.visible');
  });
});