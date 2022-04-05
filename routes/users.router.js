const express = require('express');
const router = express.Router();

const UsersService = require('../services/users.services');
const service = new UsersService()

router.get('/', (req, res) => {
	const users = service.find()
    res.json(users)
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
	const user = service.findOne(id)
    res.json(user)
});

router.post('/', (req, res) => {
	const body = req.body;
	const newUser = service.create(body)
	res.status(201).json(newUser)
})

router.patch('/:id', (req, res, next) => {
	try {
		const { id } = req.params
		const body = req.body
		const userUpdate = service.update(id, body)
		res.json(userUpdate)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', (req, res) => {
	const {id} = req.params
	const user = service.delete(id)
	res.json({
		user,
		message: 'Delete user'
	})
})

module.exports = router;
