const { UserRepository } = require('../repository/user-repository.js');

class UserService {

     constructor() {
        this.userService =  new UserRepository();
    }

     async createUser(data) {
        try {
            const user = await this.userService.createUser(data);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getUser(id, options) {
        try {
            const user = await this.userService.getUser(id);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getUserByEmail(Email) {
        try {
            const User = await this.userService.getUserByEmail(Email);
            return User;
        } catch (error) {
            console.log('something went wrong in repository', error);
            throw error;
        }
    }

     async destroy(id) {
        try {
            const user = await this.userService.destroy(id);
            return user;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllUser() {
        try {
            const users = await this.userService.getAllUser();
            return users;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async signIn(data) {
        try {
            const user = await this.userService.signIn(data.email);
            if (!user) {
                throw {error:'404:user not found!!'}
            }
            const status = await this.#checkPassword(data.password, user.password);

            if(!status) {
                throw {error:'incorrect user details'};
            }

            const newToken = await this.createToken({email:user.email, id:user.id, isPremium:user.isPremium});
            return {...user, newToken};
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

    createToken(user) {
        try {
            const token = jwt.sign(user, jwtKey, {expiresIn: '1h'});
            return token;
        } catch (error) {
            console.log("failed to create token");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, jwtKey);
            return response;
        } catch (error) {
            console.log("failed to validate token",);
            throw error;
        }
    }

    #checkPassword(userPlainInputPassword, encryptedPassword) {
        try {
            const response = bcrypt.compareSync(userPlainInputPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log('password validation failed');
            throw error;
        }
    }

    async update(totalExpense, userId, options) {
        try {
            await this.userService.update(totalExpense, userId, options);
            return true;
        } catch (error) {
            console.log('failed to update user');
            throw error;
        }
    }
}

module.exports = {
    UserService
}