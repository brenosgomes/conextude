const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const discipline = await knex("discipline").select("*");
        return res.json(discipline)
    }

    const getById = (req, res) => {
        app.db('discipline')
        .where({ discipline_id: req.params.id })
        .first()
        .then(discipline => res.json(discipline))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'discipline does not exist!')

            const rowsDeleted = await app.db('discipline').del()
                .where({ discipline_id: req.params.id })
            existsOrError(rowsDeleted, 'discipline not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const discipline = req.body;
        try {
            const newDiscipline = await knex("discipline").insert(discipline)
            res.json(newDiscipline);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const discipline = req.body;
        const discipline_id = req.params.id;
        if (discipline_id) {
            try {
                await app
                    .db("discipline")
                    .update(discipline)
                    .where({ discipline_id: discipline_id })

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