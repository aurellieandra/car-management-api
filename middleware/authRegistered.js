const jwt = require('../helper/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const payload = jwt.verifyToken(req.headers.token)
        if (!payload) {
            res.status(404).send({
                message: 'Your input has an error.'
            })
        }

        const user = await User.findOne({
            where: { email: payload.email, password: payload.password },
        })
        if (!user) {
            res.status(404).send({ message: 'User not found.' })
        } else if (user.dataValues.class == 'SuperAdmin' || user.dataValues.class == 'Admin' || user.dataValues.class == 'Member') {
            req.userlogin = user.dataValues
            next()
        } else {
            res.status(403).send({ message: 'User is not registered.' })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}