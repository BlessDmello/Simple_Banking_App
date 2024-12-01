//controllers/customerController.js
const knex = require('knex')(require('../knexfile').development);

const viewTransactions = async (req, res) => {
    const { id } = req.user; // Extract user ID from authenticated token
    const transactions = await knex('Accounts').where({ user_id: id });
    res.json(transactions);
};

const performTransaction = async (req, res) => {
    try {
        const { id } = req.user; // User ID from JWT
        const { transaction_type, amount } = req.body; // Transaction type and amount

        // Fetch the latest balance for the user
        const latestTransaction = await knex('Accounts')
            .where({ user_id: id })
            .orderBy('created_at', 'desc')
            .first(); // Get only the latest transaction

        const currentBalance = latestTransaction ? parseFloat(latestTransaction.balance) : 0; // Default balance is 0

        // Validate the transaction
        if (transaction_type === 'withdrawal' && amount > currentBalance) {
            //return res.status(400).send('No sufficient funds');
            //console.log('Error: No sufficient funds');
            return res.status(400).json({ error: 'No sufficient funds' });
        }

        // Calculate the new balance
        const newBalance =
            transaction_type === 'deposit'
                ? currentBalance + parseFloat(amount)
                : currentBalance - parseFloat(amount);

        // Insert the new transaction into the Accounts table
        await knex('Accounts').insert({
            user_id: id,
            transaction_type,
            amount: parseFloat(amount), // Store as a number
            balance: newBalance, // Updated balance
            created_at: new Date() // Timestamp for the transaction
        });

        res.status(201).send('Transaction successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while performing the transaction');
    }
};


module.exports = { viewTransactions, performTransaction };
