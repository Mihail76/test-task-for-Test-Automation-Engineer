import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


//   Сценарий: Доступность страницы авторизации

Given(`неавторизованный пользователь имеет ссылку на страницу авторизации`, () => {
});

When(`неавторизованный пользователь переходит по ссылке {string}`, (authorizationPageUrl: string) => {
    cy.intercept({
        method: 'GET',
        url: authorizationPageUrl,
      }).as('authorizationPageApiCheck');    
    cy.visit(authorizationPageUrl);
});

Then(`открывается страница авторизации {string}`, (authorizationPageUrl: string) => {
    cy.wait('@authorizationPageApiCheck').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', authorizationPageUrl);
});

// ____________________________________________________________________________________________________________________


//   Сценарий: Обязательные элементы страницы авторизации

Given(`у неавторизованного пользователя открыта страница авторизации {string}`, (authorizationPageUrl: string) => {
    cy.visit(authorizationPageUrl);
});

When(`открыта страница авторизации {string}`, (authorizationPageUrl: string) => {
    cy.url().should('eq', authorizationPageUrl);
});

Then(`страница авторизации должна содержать поле ввода почты {string}`, (inputEmail: string) => {
    cy.get('#email').should('exist');
    cy.get('#email').should('have.attr', 'placeholder', inputEmail);
});

Then(`страница авторизации должна содержать поле ввода пароля {string}`, (inputPassword: string) => {
    cy.get('#passwordBasic').should('exist');
    cy.get('#passwordBasic').should('have.attr', 'placeholder', inputPassword);
});

Then(`страница авторизации должна содержать кнопку {string}`, (buttonEnter: string) => {
    cy.get('[action="/auth/login"] > .btn').should('exist');
    cy.get('[action="/auth/login"] > .btn').should('have.attr', 'value', buttonEnter);
});

// ____________________________________________________________________________________________________________________


//   Сценарий: Негативная аутентификация - ложная почта

// Given(`у неавторизованного пользователя открыта страница авторизации {string}`, (authorizationPageUrl: string) => {
//     cy.visit(authorizationPageUrl);
// });

When(`пользователь вводит в поле ввода почты ложные данные {string}`, function(falseEmail: string) {
    cy.get('#email').type(falseEmail);
});

When(`пользователь вводит в поле ввода пароля верные данные {string}`, function(truePassword: string) {
    cy.get('#passwordBasic').type(truePassword);
});

When(`пользователь нажимает на кнопку Войти`, () => {
    cy.intercept({
        method: 'GET',
        url: "https://gitflic.ru/auth/login?error",
      }).as('authorizationErrorPageApiCheck');
    cy.get('[action="/auth/login"] > .btn').click();
});

Then(`пользователь переходит на страницу ошибочной авторизации {string}`, (authorizationErrorPageUrl: string) => {
    cy.wait('@authorizationErrorPageApiCheck').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', authorizationErrorPageUrl);
});

Then(`на странице ошибочной авторизации отображается текст ошибки {string}`, (authorizationErrorMessage: string) => {
    cy.get('[action="/auth/login"] > :nth-child(3) > .small').should('contain.text', authorizationErrorMessage);
});

// ____________________________________________________________________________________________________________________


//   Сценарий: Негативная аутентификация - ложный пароль

// Given(`у неавторизованного пользователя открыта страница авторизации {string}`, (authorizationPageUrl: string) => {
//     cy.visit(authorizationPageUrl);
// });

When(`пользователь вводит в поле ввода почты верные данные {string}`, function(trueEmail: string) {
    cy.get('#email').type(trueEmail);
});

When(`пользователь вводит в поле ввода пароля ложные данные {string}`, function(falsePassword: string) {
    cy.get('#passwordBasic').type(falsePassword);
});

// When(`пользователь нажимает на кнопку Войти`, () => {
//     cy.intercept({
//         method: 'GET',
//         url: "https://gitflic.ru/auth/login?error",
//       }).as('authorizationErrorPageApiCheck');
//     cy.get('[action="/auth/login"] > .btn').click();
// });

// Then(`пользователь переходит на страницу ошибочной авторизации {string}`, (authorizationErrorPageUrl: string) => {
//     cy.wait('@authorizationErrorPageApiCheck').its('response.statusCode').should('eq', 200);
//     cy.url().should('eq', authorizationErrorPageUrl);
// });

// Then(`на странице ошибочной авторизации отображается текст ошибки {string}`, (authorizationErrorMessage: string) => {
//     cy.get('[action="/auth/login"] > :nth-child(3) > .small').should('contain.text', authorizationErrorMessage);
// });

// ____________________________________________________________________________________________________________________


//   Сценарий: Позитивная аутентификация, авторизация в роли внутреннего пользователя системы

// Given(`у неавторизованного пользователя открыта страница авторизации {string}`, (authorizationPageUrl: string) => {
//     cy.visit(authorizationPageUrl);
// });

// When(`пользователь вводит в поле ввода почты верные данные {string}`, function(trueEmail: string) {
//     cy.get('#email').type(trueEmail);
// });

// When(`пользователь вводит в поле ввода пароля верные данные {string}`, function(truePassword: string) {
//     cy.get('#passwordBasic').type(truePassword);
// });

// When(`пользователь нажимает на кнопку Войти`, () => {
//     cy.intercept({
//         method: 'GET',
//         url: "https://gitflic.ru/auth/login?error",
//       }).as('authorizationErrorPageApiCheck');
//     cy.get('[action="/auth/login"] > .btn').click();
// });

Then(`открывается страница проектов {string}`, (projectPageUrl: string) => {
    cy.url().should('eq', projectPageUrl);
});

Then(`на странице проектов отображается логин пользователя {string}`, (userLogin: string) => {
    cy.get('.text-dark').should('contain.text', userLogin);
});

Then(`на странице настроек аккаунта {string} отображается email пользователя {string}`, (settingsAccountPageUrl: string, userEmail: string) => {
    cy.visit(settingsAccountPageUrl);
    cy.get('#email').should('have.attr', 'value', userEmail);
});

// ____________________________________________________________________________________________________________________


//   Сценарий: Автозаполнение полей ввода почты и пароля

Given(`пользователь авторизовался почта:{string}, пароль:{string}`, function(userEmail: string, userPassword: string) {
    cy.visit("https://gitflic.ru/auth/login");
    cy.get('#email').type(userEmail);
    cy.get('#passwordBasic').type(userPassword);
    cy.get('[action="/auth/login"] > .btn').click();
});

Given(`пользователь деавторизовался`, function() {
    cy.get(':nth-child(4) > .gf-dropdown__toggle').click();
    cy.get('.text-danger').click();
});

// When(`пользователь вводит в поле ввода пароля верные данные {string}`, function(truePassword: string) {
//     cy.get('#passwordBasic').type(truePassword);
// });

// When(`пользователь нажимает на кнопку Войти`, () => {
//     cy.intercept({
//         method: 'GET',
//         url: "https://gitflic.ru/auth/login?error",
//       }).as('authorizationErrorPageApiCheck');
//     cy.get('[action="/auth/login"] > .btn').click();
// });

// Then(`открывается страница проектов {string}`, (projectPageUrl: string) => {
//     cy.url().should('eq', projectPageUrl);
// });

// Then(`на странице проектов отображается логин пользователя {string}`, (userLogin: string) => {
//     cy.get('.text-dark').should('contain.text', userLogin);
// });

// Then(`на странице настроек аккаунта {string} отображается email пользователя {string}`, (settingsAccountPageUrl: string, userEmail: string) => {
//     cy.visit(settingsAccountPageUrl);
//     cy.get('#email').should('have.attr', 'value', userEmail);
// });

// ____________________________________________________________________________________________________________________

