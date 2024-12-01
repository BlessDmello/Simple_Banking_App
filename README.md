 # Simple_Banking_App

A full-stack web application that allows **bankers** and **customers** to manage their accounts and transactions efficiently. The system includes user authentication, transaction handling, balance management, and customer selection features, with a React.js frontend and Express.js backend.

---

## Features

### General
- **User Roles**: Two roles: `banker` and `customer`.
- **Authentication**: Secure login and registration using JWT-based authentication.

### Customer
- View their **transaction history**.
- Perform **transactions** (deposit or withdraw funds).
- Check their **current balance**.

### Banker
- View **total balances** across all customers.
- Access detailed **transaction history** for individual customers.
- View the **list of customers**.

---

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **CSS**: For styling the application.

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework.
- **Knex.js**: SQL query builder for database interactions.

### Database
- **SQLite**: Lightweight database for managing user and transaction data.

---

       # Entry point for the React app

## Setup and Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **SQLite**

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/bank-management-system.git
    cd bank-management-system/backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables:
    Create a `.env` file in the `backend` directory with the following content:
    ```plaintext
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```
4. Set up the database:
    ```bash
    knex migrate:latest
    knex seed:run
    ```
5. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `src` directory:
    ```bash
    cd ../src
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

---

## API Endpoints

### Authentication (`/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Login and retrieve a JWT.

### Customer (`/customer`)
- `GET /transactions`: View transaction history.
- `POST /transactions`: Perform a transaction (deposit or withdrawal).

### Banker (`/banker`)
- `GET /total-balances`: View the total balances.
- `GET /transactions/:userId`: View transactions of a specific customer.
- `GET /customers`: List all customers.

---

## Usage
1. **Start the backend** using `npm start` in the `backend` directory.
2. **Start the frontend** using `npm start` in the `src` directory.
3. Access the app in your browser at `http://localhost:3001`.

---
## Acknowledgements
- Special thanks to the open-source community for supporting the tools and libraries used in this project.

---

Feel free to contribute and improve the system! 🚀
