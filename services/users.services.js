const faker = require('faker')
// const boom = require('@hapi/boom');

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
			})
		}
	}

	create(data) {
		const newUser = {
			id: faker.datatype.uuid(),
			...data
		}
		this.users.push(newUser);
		return newUser
	}

	find() {
		return this.users
	}

	findOne(id) {
		const user = this.users.find(user => user.id === id)
		return user
	}

	update(id, newData) {
		let user = this.users.find(user => user.id === id)
		if (user) {
			user = {
				...user,
				...newData
			}
		} else {
			throw new Error('There isn\'t this user');
		}
	}

	delete(id) {
		const users = this.users.filter(user => user.id !== id)
		this.users = users
		return `Deleting user ${id}`
	}

}

module.exports = UsersService;
