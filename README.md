# Bad Bank

## Project Overview

Bad Bank is the capstone project for the MIT xPro Professional Certificate in Coding: Full Stack Development with MERN. It is a web application that simulates basic banking functionalities, including account creation, login, deposits, withdrawals, transfers, transaction history and an admin overview.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Account Management**: Create and manage user accounts.
- **Authentication**: Login and logout functionality.
- **Transactions**: Deposit and withdraw money.
- **Transfer**: Transfer funds between accounts.
- **Transaction History**: View transaction history.
- **Admin Access**: Admins can view all user data.

## Tech Stack

### Frontend
- React.js
- React Bootstrap
- React Router

### Backend
- Node.js
- Express.js
- Firebase (Firestore)

### Tools
- Babel
- Webpack
- Jest (for testing)

## File Structure

Bad Bank/
│
├── client/
│ ├── public/
│ │ ├── index.html
│ │ ├── bank.png
│ │ ├── github.png
│ │ └── linkedIn.png
│ ├── src/
│ │ ├── components/
│ │ │ ├── context.js
│ │ │ ├── footer.js
│ │ │ ├── navbar.js
│ │ │ ├── transactionTools.js
│ │ │ ├── useTransactionState.js
│ │ │ └── validation.js
│ │ ├── pages/
│ │ │ ├── allData.js
│ │ │ ├── createAccount.js
│ │ │ ├── deposit.js
│ │ │ ├── home.js
│ │ │ ├── login.js
│ │ │ ├── transactionHistory.js
│ │ │ ├── transfer.js
│ │ │ ├── userTransactions.js
│ │ │ └── withdraw.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── babel.config.json
│ ├── package.json
│ └── package-lock.json
│
├── server/
│ ├── dal.js
│ ├── database_test.js
│ ├── firebase.js
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
│
└── README.md


## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/badbank.git
   cd badbank

2. **Install dependencies:**

  Navigate to the root directory and install the dependencies for both client and server
  
  npm install
cd client && npm install
cd ../server && npm install

3. **Configure Firebase:**

Ensure that your Firebase project configuration matches the details in firebase.js.

4. **Start the application:**

You can run both the server and client using the following command:

npm run dev

This will concurrently start the client and server.

Usage
Account Creation: Navigate to the Create Account page to register a new user.
Login: Use the Login page to access your account.
Transactions: Perform deposits and withdrawals on the respective pages.
Transfer: Use the Transfer page to send funds to another user.
Transaction History: View your transaction history under Transaction History.
Admin Access: Admins can access all user data through the All Data page.
API Endpoints
Create Account: /account/create/:name/:email/:password
Login: /account/login/:email/:password
Find User: /account/find/:email
Update Balance (Deposit/Withdraw): /account/update/:email/:amount
Get Balance: /account/balance/:email
Get All Accounts: /account/all
Transaction History: /account/transactions/:email
Transfer Money: /account/transfer/:senderEmail/:recipientEmail/:amount
Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## License
This project is licensed under the MIT License.
# BadBankFullStack
