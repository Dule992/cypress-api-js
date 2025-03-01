// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const apiWalletTransactionsUrl = `${Cypress.env("apiUrl")}`;

Cypress.Comanns.add('user/login', (username, password) => {
    cy.request({
        method: 'POST',
        url: `${apiWalletTransactionsUrl}/user/login`,
        body: {
            username: username,
            password: password
        }
    })
        .then((response) => {
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('userId', response.body.userId);
        })
});

Cypress.Commands.add('getUserInfo', (userId, token) => {
    cy.request({
        method: 'GET',
        url: `${apiWalletTransactionsUrl}/user/info/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
});

Cypress.Commands.add('getWalletInfo', (walletId, token) => {
    cy.request({
        method: 'GET',
        url: `${apiWalletTransactionsUrl}/wallet/${walletId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
});

Cypress.Commands.add('processTransaction', (walletId, token, transaction) => {
    cy.request({
        method: 'POST',
        url: `${apiWalletTransactionsUrl}/wallet/${walletId}/transaction`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: {
            currency: transaction.currency,
            amount: transaction.amount,
            type: transaction.type
        }
    });
});

Cypress.Commands.add('getTransactionDetails', (walletId, transactionId, token) => {
    cy.request({
        method: 'GET',
        url: `${apiWalletTransactionsUrl}/wallet/${walletId}/transaction/${transactionId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
});

Cypress.Commands.add('getAllTransactions', (walletId, token) => {
    cy.request({
        method: 'GET',
        url: `${apiWalletTransactionsUrl}/wallet/${walletId}/transactions`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
});
