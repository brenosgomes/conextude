const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const employeeDiscipline = await knex("employeeDiscipline").select("*");
        return res.json(employeeDiscipline)
    }

    const getById = (req, res) => {
        app.db('employeeDiscipline')
        .where({ employeeDiscipline_id: req.params.id })
        .first()
        .then(employeeDiscipline => res.json(employeeDiscipline))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'employeeDiscipline does not exist!')

            const rowsDeleted = await app.db('employeeDiscipline').del()
                .where({ employeeDiscipline_id: req.params.id })
            existsOrError(rowsDeleted, 'employeeDiscipline not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const employeeDiscipline = req.body;
        try {
            const newEmployeeDiscipline = await knex("employeeDiscipline").insert(employeeDiscipline)
            res.json(newEmployeeDiscipline);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const employeeDiscipline = req.body;
        const employeeDiscipline_id = req.params.id;
        if (employeeDiscipline_id) {
            try {
                await app
                    .db("employeeDiscipline")
                    .update(employeeDiscipline)
                    .where({ employeeDiscipline_id: employeeDiscipline_id })

                res.status(200).send();
            } catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        } else {
            return res.status(400);
        }
    }

    return { get, getById, post, put, remove }
}