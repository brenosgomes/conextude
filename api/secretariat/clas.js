const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const clas = await knex("clas").select("*");
        return res.json(clas)
    }

    const getById = (req, res) => {
        app.db('clas')
        .where({ clas_id: req.params.id })
        .first()
        .then(clas => res.json(clas))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'clas does not exist!')

            const rowsDeleted = await app.db('clas').del()
                .where({ clas_id: req.params.id })
            existsOrError(rowsDeleted, 'clas not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const clas = req.body;
        try {
            const newClas = await knex("clas").insert(clas)
            res.json(newClas);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const clas = req.body;
        const clas_id = req.params.id;
        if (clas_id) {
            try {
                await app
                    .db("clas")
                    .update(clas)
                    .where({ clas_id: clas_id })

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