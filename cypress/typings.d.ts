/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/// <reference types="cypress" />
/// <reference types="cypress-wait-until" />
/// <reference types="cypress-real-events" />

declare global {
  namespace Cypress {
    interface Chainable {
      clearAndType(value: number | string): Chainable<JQuery<Element>>;
      typeAndBlur(value: number | string): void;
      clickOutside(): void;
    }
  }
}

export {};
