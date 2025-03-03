# Test Plan for Wallet Transactions API

## Implemented Test Cases

1. **Create Transaction Successfully**
   - **Description**: Test creating a transaction with valid data.
   - **Priority**: High
   - **Assertions**:
     - Response status code is 201.
     - Response body contains `transactionId`.

2. **Create Transaction with Invalid Amount**
   - **Description**: Test creating a transaction with an invalid amount.
   - **Priority**: High
   - **Assertions**:
     - Response status code is 400.

3. **Create Transaction with Unsupported Currency**
   - **Description**: Test creating a transaction with an unsupported currency.
   - **Priority**: Medium
   - **Assertions**:
     - Response status code is 400.

4. **Create Transaction Without Transaction Type**
   - **Description**: Test creating a transaction without a transaction type.
   - **Priority**: Medium
   - **Assertions**:
     - Response status code is 400.

5. **Create Transaction with Exceeding Limits**
   - **Description**: Test creating a transaction with an amount exceeding predefined limits.
   - **Priority**: Medium
   - **Assertions**:
     - Response status code is 400.

## Unimplemented Test Cases

1. **Transaction with Future Date**
   - **Description**: Test creating a transaction with a future date.
   - **Priority**: Low

2. **Transaction with Past Date**
   - **Description**: Test creating a transaction with a past date.
   - **Priority**: Low

3. **Concurrent Transactions**
   - **Description**: Test multiple concurrent transactions to the same wallet.
   - **Priority**: Low

4. **Unauthorized Transaction**
   - **Description**: Test creating a transaction without a valid token.
   - **Priority**: High

5. **Transaction History Retrieval**
   - **Description**: Test retrieving the transaction history of a wallet.
   - **Priority**: Medium