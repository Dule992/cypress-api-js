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

Cypress.Commands.add('loginUser', (username, password) => {
    try {
        cy.request({
            method: 'POST',
            url: `${apiWalletTransactionsUrl}/user/login`,
            headers: {
                'X-Service-Id': 'wallet-transactions'
            },
            body: {
                "username": username,
                "password": password
            },
        })
            .then((response) => {
                Cypress.env("token", response.body.token);
                Cypress.env("userId", response.body.userId);
            })
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to login with username: ${username} and password: ${password}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('getUserInfo', () => {
    try {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/user/info/${Cypress.env("userId")}`,
            headers: {
                Authorization: `Bearer ${Cypress.env("token")}`
            }
        })
            .then((response) => {
                Cypress.env("walletId", response.body.walletId);
            });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to get user info with userId: ${Cypress.env("userId")}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('getWalletInfo', () => {
    try {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to get wallet info with walletId: ${Cypress.env('walletId')}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('getWalletInfoEmpty', () => {
    try {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}/empty`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            },
            failOnStatusCode: false
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to get wallet info with walletId: ${Cypress.env('walletId')}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('processTransaction', (transaction) => {
    try {
        cy.request({
            method: 'POST',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}/transaction`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            },
            body: {
                currency: transaction.currency,
                amount: transaction.amount,
                type: transaction.type
            }
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to process transaction with walletId: ${Cypress.env('walletId')}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('processTransactionBad', (transaction) => {
    try {
        cy.request({
            method: 'POST',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}/transaction/bad`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            },
            body: {
                currency: transaction.currency,
                amount: transaction.amount,
                type: transaction.type
            },
            failOnStatusCode: false
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to process transaction with walletId: ${Cypress.env('walletId')}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('getTransactionDetails', (transactionId) => {
    try {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}/transaction/${transactionId}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to get transaction details with walletId: ${Cypress.env('walletId')} and transactionId: ${transactionId}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});

Cypress.Commands.add('getAllTransactions', () => {
    try {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/wallet/${Cypress.env('walletId')}/transactions`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        });
    } catch (error) {
        if (error.response) {
            throw new Error(
                `Failed to get all transactions with walletId: ${Cypress.env('walletId')}.`,
            );
        } else if (error.request) {
            throw new Error(error.request);
        }
        else {
            throw new Error(error.message);
        }
    }
});
