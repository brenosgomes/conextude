const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const employee = await knex("employee").select("*");
        return res.json(employee)
    }

    const getById = (req, res) => {
        app.db('employee')
        .where({ employee_id: req.params.id })
        .first()
        .then(employee => res.json(employee))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'employee does not exist!')

            const rowsDeleted = await app.db('employee').del()
                .where({ employee_id: req.params.id })
            existsOrError(rowsDeleted, 'employee not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const employee = req.body;
        try {
            const newEmployee = await knex("employee").insert(employee)
            res.json(newEmployee);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const employee = req.body;
        const employee_id = req.params.id;
        if (employee_id) {
            try {
                await app
                    .db("employee")
                    .update(employee)
                    .where({ employee_id: employee_id })

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