const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const multimidia = await knex("multimidia").select("*");
        return res.json(multimidia)
    }

    const getById = (req, res) => {
        app.db('multimidia')
        .where({ multimidia_id: req.params.id })
        .first()
        .then(multimidia => res.json(multimidia))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimidia does not exist!')

            const rowsDeleted = await app.db('multimidia').del()
                .where({ multimidia_id: req.params.id })
            existsOrError(rowsDeleted, 'multimidia not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const multimidia = req.body;
        try {
            const newmultimidia = await knex("multimidia").insert(multimidia)
            res.json(newmultimidia);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const multimidia = req.body;
        const multimidia_id = req.params.id;
        if (multimidia_id) {
            try {
                await app
                    .db("multimidia")
                    .update(multimidia)
                    .where({ multimidia_id: multimidia_id })

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