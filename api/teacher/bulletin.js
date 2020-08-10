const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const bulletin = await knex("bulletin").select("*");
        return res.json(bulletin)
    }

    const getById = (req, res) => {
        app.db('bulletin')
        .where({ bulletin_id: req.params.id })
        .first()
        .then(bulletin => res.json(bulletin))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'bulletin does not exist!')

            const rowsDeleted = await app.db('bulletin').del()
                .where({ bulletin_id: req.params.id })
            existsOrError(rowsDeleted, 'bulletin not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const bulletin = req.body;
        try {
            const newBulletin = await knex("bulletin").insert(bulletin)
            res.json(newBulletin);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const bulletin = req.body;
        const bulletin_id = req.params.id;
        if (bulletin_id) {
            try {
                await app
                    .db("bulletin")
                    .update(bulletin)
                    .where({ bulletin_id: bulletin_id })

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