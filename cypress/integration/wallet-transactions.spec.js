

let token = null;
let userId = null;

descirbe('Wallet Transactions', () => {

    it.beforeEach(() => {
        cy.fixture('user').then((user) => {
            cy.login(user.username, user.password)
        })

        token = window.localStorage.getItem('token');
        userId = window.localStorage.getItem('userId');
    });

    //User Info

    it('should return a user information for a specific userId', () => {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/user/info/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', 1)
            })
    });

    //Wallet Transactions

    it('should return a wallet information', () => {
        cy.fixture('wallet').then((wallet) => {
            cy.request({
                method: 'GET',
                url: `${apiWalletTransactionsUrl}/wallet/${wallet.walletId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        });
    });

    it('should proccess a transaction for a wallet', () => {
        cy.fixture('wallet').then((wallet) => {
            cy.request({
                method: 'POST',
                url: `${apiWalletTransactionsUrl}/wallet/${walletId}/transaction`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    currency: wallet.currency,
                    amount: wallet.amount,
                    type: wallet.type
                }
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('transactionId')
                    expect(response.body).to.have.property('status', 'finished')
                    expect(response.body).to.have.property('outcome', 'approved')
                })
        });
    });

    it('should retrive a details of a specific transaction', () => {
        cy.fixture('wallet').then((wallet) => {
            cy.request({
                method: 'GET',
                url: `${apiWalletTransactionsUrl}/wallet/${wallet.walletId}/transaction/${wallet.transactionId}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('amount', 200)
                    expect(response.body).to.have.property('type', 'debit')
                })
        });
    });

    it('should retrive all transactions with pagination and date limits', () => {
        cy.request({
            method: 'GET',
            url: `${apiWalletTransactionsUrl}/wallet-transactions/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    });

});