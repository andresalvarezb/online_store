const Joi = require('joi')

const id = Joi.string().uuid();
const name = Joi.string().min(3)
const gender = Joi.string()
const email = Joi.string().email()

const createUsersSchema = Joi.object({
	name: name.required(),
	gender: gender.required(),
	email: email.required(),
})

const getUsersSchema = Joi.object({
	id: id.required()
})

const updateUsersSchema = Joi.object({
	name: name,
	gender: gender,
	email: email,
})

module.exports = {
	createUsersSchema,
	getUsersSchema,
	updateUsersSchema,
}
