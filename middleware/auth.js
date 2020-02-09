const User = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer <token>
        const user = await User.findOne({"token.value": token})

        if(!user) {
            return res.status(401).json({
                error: new Error('You are not authorized')
            })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}