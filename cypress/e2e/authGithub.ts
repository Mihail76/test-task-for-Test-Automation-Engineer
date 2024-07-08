import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import commands from '../support/commands';

commands.authForm.Given['Пользователь открыл страницу авторизации github.com']();
commands.authForm.Then['Форма авторизации отображена']();
