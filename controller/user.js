const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('../helper/jwt')

module.exports = class {
    static async getAllUsers(req, res, next) {
        try {
            const result = await User.findAll()
            res.status(201).send({
                status: 201,
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async currentUser(req, res, next) {
        try {
            res.status(200).send({
                status: 200,
                message: 'User has been found.',
                data: req.userlogin
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static async registerAdmin(req, res, next) {
        try {
            const result = await User.create({
                nama: req.body.nama,
                class: req.body.class,
                email: req.body.email,
                password: req.body.password
            })
            res.status(201).send({
                status: 201,
                message: 'User added succesfully.',
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async registerMember(req, res, next) {
        try {
            const result = await User.create({
                nama: req.body.nama,
                class: 'Member',
                email: req.body.email,
                password: req.body.password
            })
            res.status(201).send({
                status: 201,
                message: 'User added succesfully.',
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } })
            if (!user) {
                res.status(404).send({
                    status: 404,
                    message: 'User not found.'
                })
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password)

            if (!isValidPassword) {
                res.status(404).send({
                    status: 404,
                    message: 'Email and password not match.'
                })
            }

            const token = jwt.generateToken({ email: user.email, password: user.password })
            const secureUser = user.dataValues
            delete secureUser.password

            res.status(200).send({
                status: 200,
                message: 'User found.',
                data: {
                    user: secureUser,
                    token: token
                }
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

}