const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const credit = await knex("credit").select("*");
        return res.json(credit)
    }

    const getById = (req, res) => {
        app.db('credit')
        .where({ credit_id: req.params.id })
        .first()
        .then(credit => res.json(credit))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'credit does not exist!')

            const rowsDeleted = await app.db('credit').del()
                .where({ credit_id: req.params.id })
            existsOrError(rowsDeleted, 'credit not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const credit = req.body;
        try {
            const newcredit = await knex("credit").insert(credit)
            res.json(newcredit);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const credit = req.body;
        const credit_id = req.params.id;
        if (credit_id) {
            try {
                await app
                    .db("credit")
                    .update(credit)
                    .where({ credit_id: credit_id })

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