import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import commands from 'cypress/support/commands';

commands.authForm.Given['Пользователь запустил клиент']();
commands.authForm.Then['Форма авторизации отображена']();
