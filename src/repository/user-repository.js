const db = require('../models/index.js');
const user = db.User;

class UserRepository {

    async createUser(data) {
        try {
            const User = await user.create(data);
            return User;
        } catch (error) {
            console.log('something went wrong in repository', error);
            throw error;
        }
    }

    async getUser(id) {
        try {
            const User = await user.findByPk(id);
            return User;
        } catch (error) {
            console.log('something went wrong in repository', error);
            throw error;
        }
    }

    async getUserByEmail(Email) {
        try {
            const User = await user.findOne({
                where: {
                    email: Email
                }
            });
            return User;
        } catch (error) {
            console.log('something went wrong in repository', error);
            throw error;
        }
    }
}

module.exports = {
    UserRepository
}