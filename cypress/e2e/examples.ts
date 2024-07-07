import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('some precondition', () => {
  cy.log(`given`);
});

When('I do some actions', () => {
  cy.log(`when`);
});

Then('I get some result', () => {
  cy.log(`then`);
});

Then('I am very happy', () => {
  cy.title().should('not.include', 'Google');
});

When('I sum {int} and {int}', (a: number, b: number) => {
  cy.wrap(a + b).as('sumResult');
});

Then('I want to see {int}', (expected: number) => {
  cy.get('@sumResult').should('equal', expected);
});
