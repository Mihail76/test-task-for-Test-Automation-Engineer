import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import dom from '../dom';

const givenCommand1 = {
  commandId: 'Пользователь открыл страницу авторизации gitflic.ru' as const,
  action() {
    Given(this.commandId, () => {
      cy.visit('https://gitflic.ru//login');
    });
  },
};

const GivenCommands = {
  [givenCommand1.commandId]: givenCommand1.action.bind(givenCommand1),
};

const thenCommand1 = {
  commandId: 'Форма авторизации отображена' as const,
  action() {
    Then(this.commandId, () => {
      dom.auth.getAuthForm().should('exist');
    });
  },
};

const ThenCommands = {
  [thenCommand1.commandId]: thenCommand1.action.bind(thenCommand1),
};
const auth = {
  Then: ThenCommands,
  Given: GivenCommands,
};

export default auth;
