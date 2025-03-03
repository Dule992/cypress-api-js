# Wallet API Tests

## Setup

1. Clone the repository `https://github.com/Dule992/cypress-api-js`
2. Install dependencies:

```bash
npm install
```

## Docker

If you want to run Wiremock container as a stub of Wallet Transactions API use this command:

```bash
docker-compose up
```

## Running Tests

To open the Cypress Test Runner:

```bash
npm run cypress:open
```

To run the tests in headless mode:

```bash
npm run cypress:run
```

## Test Reports

To open the Test Reports navigate to mochaawesome-report folder after execution tests in headless mode and open html file.

## Dependencies

- Cypress