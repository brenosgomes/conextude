const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const office = await knex("office").select("*");
        return res.json(office)
    }

    const getById = (req, res) => {
        app.db('office')
        .where({ office_id: req.params.id })
        .first()
        .then(office => res.json(office))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'office does not exist!')

            const rowsDeleted = await app.db('office').del()
                .where({ office_id: req.params.id })
            existsOrError(rowsDeleted, 'office not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const office = req.body;
        try {
            const newOffice = await knex("office").insert(office)
            res.json(newOffice);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const office = req.body;
        const office_id = req.params.id;
        if (office_id) {
            try {
                await app
                    .db("office")
                    .update(office)
                    .where({ office_id: office_id })

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