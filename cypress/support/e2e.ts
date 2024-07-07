import 'cypress-real-events/support';
import 'cypress-wait-until';

Cypress.Commands.add('typeAndBlur', { prevSubject: 'element' }, (subject, value) => {
  cy.wrap(subject).focus().type(`${value}`);
  cy.clickOutside();
});

Cypress.Commands.add(
  'clearAndType',
  // @ts-expect-error
  { prevSubject: 'element' },
  (subject: unknown, value: string) => {
    cy.wrap(subject).clear();

    return cy.wrap(subject).type(value);
  },
);

Cypress.Commands.add('clickOutside', () => {
  return cy.get('body').click(0, 0); // 0,0 here are the x and y coordinates
});
