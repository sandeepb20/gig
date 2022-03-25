const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 
DB_PORT = process.env.DB_PORT;

mongoose.connect(DB_PORT + 'gigforce_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, function (err) {
	if (err) console.log(err);
	else console.log("Database is connected :)");
});

const app = express()

app.use(bodyParser.json())
app.use(cookieParser());

app.post('/api/register', async (req, res) => {
	const { email, password: plainTextPassword, name, phone, address } = req.body

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' });
	}
	if (validator.validate("test@email.com") == false){   // validate email
		return res.json({status: 'error', error: 'Invalid email! Please type a valid email'});
	} 
	const user = await User.findOne({ email }).lean() // Check if user is already registered
	if (user) {
		return res.json({ status: 'error', error: 'User is already registered' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password! Please try again' })
	}

	if (plainTextPassword.length < 8) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 9 characters'
		})
	}

	if (!name || typeof name !== 'string') {
		return res.json({ status: 'error', error: 'Invalid Name' })
	}

	if (!phone || typeof phone !== 'number') {
		return res.json({ status: 'error', error: 'Invalid Phone Number' })
	}

	if (!address || typeof address !== 'string') {
		return res.json({ status: 'error', error: 'Invalid Address' })
	}

	const password = await bcrypt.hash(plainTextPassword, 10) // plain password to hash password

	try {
		const response = await User.create({
			email,
			password,
			name,
			phone,
			address
		})
		console.log('User created successfully: ', response);

		const token = jwt.sign(
			{ id: response._id, email:response.email},
			JWT_SECRET
		)
		response.token = token;
		res.status(201).json(response);
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'email already in use' })
		}
		throw error
	}

})


app.post('/api/login', async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email }).lean() 
	if (!user) {
		return res.json({ status: 'error', error: 'User does not exist' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the email, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)
		user.token = token;
		
		return res.status(200).json(user);
	}
	res.json({ status: 'error', error: 'Invalid email/password! Please Try again' })
})

app.get('/api/profile',function(req, res){
	const usertoken = req.headers.authorization || req.body.token || req.query.token || req.headers["x-access-token"];
	if(!usertoken) {
		return res.status(403).send("A token is required for authentication");
	}
	try{
		const token = usertoken.split(' ');
		const decoded = jwt.verify(token[1], JWT_SECRET);
		var useremail = decoded.email;
		User.findOne({email: useremail}).then(function(user){
			return res.status(200).json(user);
		});
		
		//req.user = decoded;
		//return res.status(200).json(decoded);
	}
	catch(err) {
		return res.status(401).send("Invalid Token");
	}
	
});

port = process.env.PORT;
app.listen(port, () => {
	console.log('Server is running on Port:', port);
})
