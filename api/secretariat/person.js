const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const person = await knex("person").select("*");
        return res.json(person)
    }

    const getById = (req, res) => {
        app.db('person')
        .where({ person_id: req.params.id })
        .first()
        .then(person => res.json(person))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'person does not exist!')

            const rowsDeleted = await app.db('person').del()
                .where({ person_id: req.params.id })
            existsOrError(rowsDeleted, 'person not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const person = req.body;
        try {
            const newPerson = await knex("person").insert(person)
            res.json(newPerson);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const person = req.body;
        const person_id = req.params.id;
        if (person_id) {
            try {
                await app
                    .db("person")
                    .update(person)
                    .where({ person_id: person_id })

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