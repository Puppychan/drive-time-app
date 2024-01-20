// This tells VS Code to autocomplete cypress
/// <reference types="cypress" />

// cypress/integration/login_spec.js

describe('Login Functionality', () => {
  beforeEach(() => {
    // Replace with the correct URL if you have a web version available for your Expo app
    cy.visit('http://localhost:19006/login');
  });

  it('allows a user to log in with correct credentials', () => {
    // Replace the selectors below with ones appropriate for your application
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();

    // After successful login, you should be redirected, check for the URL change
    // Replace '/customer/home' with the route you redirect to after login
    cy.url().should('include', '/customer/home');

    // Verify some element that is only visible after login is present
    // Replace 'Welcome' with a unique text or element in your dashboard
    cy.contains('Welcome').should('exist');
  });

  it('displays an error message with incorrect credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('incorrectpassword');
    cy.get('button[type="submit"]').click();

    // Verify that an error message shows up
    // Replace 'Invalid username or password' with the actual error message
    cy.contains('Invalid username or password').should('exist');
  });

  // Add more tests as needed for "forgot password", "remember me", and other functionalities
});
