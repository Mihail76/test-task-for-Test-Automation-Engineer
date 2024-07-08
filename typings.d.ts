/// <reference types="cypress" />

declare module 'cypress-on-fix' {
  const cypressOnFix: (cypressOn: Cypress.PluginEvents) => Cypress.PluginEvents; // Замените `any` на более конкретные типы, если они вам известны
  export default cypressOnFix;
}
