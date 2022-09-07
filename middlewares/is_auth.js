const jwt = require('jsonwebtoken');
const User = require('../model/User');
const getTokenData = require('../router/jwt_config');

module.exports = async (req, res, next) => {

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    
    const token = authHeader.split(' ')[1];
    const data = await getTokenData(token);
    const { _id } = data.user;
    const userData = await User.findById({ _id: _id });
    if (userData.role === 'ADMIN' && userData.blocked == false) {
        next();
    } else {
        res.status(403).send({
            data: {
                user: userData,
            },
            status: {
                code: 403,
                message: "Unathorized",
                succeeded: false,
            }
        });
    }


}

