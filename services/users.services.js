const faker = require('faker')
const boom = require('@hapi/boom');

class UsersService {

	constructor() {
		this.users = [];
		this.generate();
	}

	generate() {
		for (let i = 0; i < 10; i++) {
			this.users.push({
				id: faker.datatype.uuid(),
				name: faker.name.firstName(),
				gender: faker.name.gender(),
				email: faker.internet.email()
			})
		}
	}

	async create(data) {
		const newUser = {
			id: faker.datatype.uuid(),
			...data,
		}
		this.users.push(newUser);
		return newUser
	}

	async find() {
		return this.users
	}

	async findOne(id) {
		const user = this.users.find(user => user.id === id)
		if (!user) {
			throw boom.notFound('user not found')
		}
		return user
	}

	async update(id, newData) {
		let user = this.users.find(user => user.id === id)
		if (user) {
			user = {
				...user,
				...newData
			}
		} else {
			throw boom.notFound('user not found');
		}
		return user
	}

	async delete(id) {
		const index = this.users.findIndex(user => user.id === id)
		if (index !== -1) {
			this.users.splice(index, 1);
		} else {
			throw boom.notFound('product not found')
		}
		return id
	}

}

module.exports = UsersService;
