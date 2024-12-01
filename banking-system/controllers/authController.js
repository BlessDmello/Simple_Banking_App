//controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile').development);

// Register a new user
const register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!['banker', 'customer'].includes(role)) {
        return res.status(400).send('Invalid role');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('Users').insert({ username, password: hashedPassword, role });
    res.status(201).send('User registered successfully');
};

// Login a user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await knex('Users').where({ username }).first();
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" }); // Send specific error
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Create the JWT token with role and id
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user role in the response
        res.status(200).json({
            token,
            role: user.role, // Return the role along with the token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { register, login };
