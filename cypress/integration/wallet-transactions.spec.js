const { TransactionStatus, TransactionOutcome } = require("../models/transaction");

describe('Wallet API Transactions', () => {

    beforeEach(() => {
        cy.fixture('user').then((user) => {
            cy.loginUser(user.username, user.password)
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property("token", Cypress.env("token"))
                    expect(response.body).to.have.property("userId", Cypress.env("userId"))
                })

            cy.getUserInfo()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property("walletId", Cypress.env("userId"))
                });
        });
    });


    it('should create transaction successfully', () => {

        // Test all 3 currencies
        const currencies = ['USD', 'EUR', 'GBP'];
        currencies.forEach((currency) => {
            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('walletId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });

            cy.fixture('transaction').then((transaction) => {
                const currentTransaction = {
                    currency: transaction[currency].credit.currency,
                    amount: transaction[currency].credit.amount,
                    type: transaction[currency].credit.type
                }
                cy.processTransaction(currentTransaction)
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.have.property('transactionId')
                        expect(response.body).to.have.property('status', TransactionStatus.finished)
                        expect(response.body).to.have.property('outcome', TransactionOutcome.approved)
                    })

                // Validate the transaction has been processed and wallet updated
                cy.getWalletInfo()
                    .then((response) => {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.have.property('walletId', Cypress.env('walletId'))
                        expect(response.body.currencyClips).to.have.length(3)
                        expect(response.body.currencyClips.find(obj => obj.currency === `${currency}`)).to.have.property('currency', currentTransaction.currency)
                        expect(response.body.currencyClips.find(obj => obj.currency === `${currency}`)).to.have.property('balance', currentTransaction.amount)
                    })
            });
        });
    });


    it('should not create transaction with invalid amount', () => {
        cy.fixture('transaction').then((transaction) => {
            const currentTransaction = {
                currency: transaction.EUR.credit.currency,
                amount: -1000,
                type: transaction.EUR.credit.type
            }

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('walletId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });

            cy.processTransactionBad(currentTransaction)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('userId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });
        });
    });

    it('should not create transaction with unsupported currency', () => {
        cy.fixture('transaction').then((transaction) => {
            const currentTransaction = {
                currency: 'XYZ',
                amount: transaction.EUR.credit.amount,
                type: transaction.EUR.credit.type
            }

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('walletId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });

            cy.processTransactionBad(currentTransaction)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('userId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });
        });
    });

    it('should not create transaction without transaction type', () => {
        cy.fixture('transaction').then((transaction) => {
            const currentTransaction = {
                currency: transaction.EUR.credit.currency,
                amount: transaction.EUR.credit.amount
            }

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('walletId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });

            cy.processTransactionBad(currentTransaction)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('userId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });
        });
    });

    it('should not create transaction with exceeding limits', () => {
        cy.fixture('transaction').then((transaction) => {
            const currentTransaction = {
                currency: transaction.EUR.credit.currency,
                amount: 1000000000,
                type: transaction.EUR.credit.type
            }

            cy.processTransactionBad(currentTransaction)
                .then((response) => {
                    expect(response.status).to.eq(400)
                })

            cy.getWalletInfoEmpty()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('walletId', Cypress.env('userId'))
                    expect(response.body.currencyClips).to.have.length(0)
                });
        })
    });
});
