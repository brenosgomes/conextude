const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const scraps = await knex("scraps").select("*");
        return res.json(scraps)
    }

    const getById = (req, res) => {
        app.db('scraps')
        .where({ scraps_id: req.params.id })
        .first()
        .then(scraps => res.json(scraps))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'scraps does not exist!')

            const rowsDeleted = await app.db('scraps').del()
                .where({ scraps_id: req.params.id })
            existsOrError(rowsDeleted, 'scraps not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const scraps = req.body;
        try {
            const newscraps = await knex("scraps").insert(scraps)
            res.json(newscraps);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const scraps = req.body;
        const scraps_id = req.params.id;
        if (scraps_id) {
            try {
                await app
                    .db("scraps")
                    .update(scraps)
                    .where({ scraps_id: scraps_id })

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