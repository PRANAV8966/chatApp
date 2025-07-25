const { UserService } = require('../services/user-service.js');
const userController = new UserService();

const createUser = async (req, res) => {
    try {
        const user = await userController.createUser(req.body);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully created user',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to create user',
            error:error
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userController.getUser(req.params.id);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully fetched user',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch user',
            error:error
        });
    }
}

module.exports = {
    createUser,
    getUser
}