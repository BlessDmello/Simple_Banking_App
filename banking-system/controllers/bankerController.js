//controllers/bankerController.js
const knex = require('knex')(require('../knexfile').development);

const viewTotalBalances = async (req, res) => {
    try {
        // Subquery to get the latest transaction ID for each user
        const latestBalancesSubquery = knex('Accounts')
            .select('user_id')
            .max('id as latest_transaction')
            .groupBy('user_id');

        // Join with the subquery to fetch the latest balances and calculate the total
        const totalBalanceData = await knex('Accounts')
            .join(
                latestBalancesSubquery.as('latest'),
                'Accounts.id',
                'latest.latest_transaction'
            )
            .sum('Accounts.balance as total_balance');

        const totalBalance = totalBalanceData[0]?.total_balance || 0;

        res.json({ total_balance: totalBalance });
    } catch (error) {
        console.error('Error fetching total balances:', error);
        res.status(500).send('An error occurred while fetching the total balances');
    }
};

const viewCustomerTransactions = async (req, res) => {
    const { userId } = req.params;
    try {
        const transactions = await knex('Accounts').where({ user_id: userId });
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching customer transactions:', error);
        res.status(500).send('An error occurred while fetching transactions');
    }
};

const viewCustomer = async (req, res) => {
    try {
      const customers = await knex('Users').where({ role: 'customer' }).select('id', 'username');
      res.json(customers);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching customers');
    }
  };


module.exports = { viewTotalBalances, viewCustomerTransactions,viewCustomer };
