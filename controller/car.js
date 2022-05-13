const { Car } = require('../models');

module.exports = class {
    static async getAllCars(req, res, next) {
        try {
            const result = await Car.findAll()
            res.status(201).send({
                status: 201,
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async getCarsTrue(req, res, next) {
        try {
            const result = await Car.findAll({ where: { available: 'true' } })
            res.status(201).send({
                status: 201,
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async getCarsFalse(req, res, next) {
        try {
            const result = await Car.findAll({ where: { available: 'false' } })
            res.status(201).send({
                status: 201,
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async addCar(req, res, next) {
        try {
            const result = await Car.create({
                nama: req.body.nama,
                tipe: req.body.tipe,
                deskripsi: req.body.deskripsi,
                ukuran: req.body.ukuran,
                available: 'true',
                createdBy: req.userlogin.nama
            })
            res.status(201).send({
                status: 201,
                message: 'Car successfully created.',
                data: result
            })
        } catch (err) {
            res.status(500).send(err)
        }

    }

    static async updateCar(req, res, next) {
        try {
            const result = await Car.update({
                nama: req.body.nama,
                tipe: req.body.tipe,
                deskripsi: req.body.deskripsi,
                ukuran: req.body.ukuran,
                updatedBy: req.userlogin.nama
            }, {
                where: { id: req.params.id }
            })
            res.status(201).send({
                status: 201,
                message: 'Car sucessfully updated.',
                data: req.body
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async softDeleteCar(req, res, next) {
        try {
            await Car.update({
                available: 'false',
                deletedBy: req.userlogin.nama
            }, {
                where: { id: req.params.id }
            })
            res.status(201).send({
                status: 201,
                message: 'Car sucessfully deleted.',
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    static async destroyCar(req, res, next) {
        try {
            await Car.destroy({
                where: { id: req.params.id }
            })
            res.status(201).send({
                status: 201,
                message: 'Car sucessfully destroyed.',
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }
}  