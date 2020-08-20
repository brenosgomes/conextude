const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const calendar = await knex("calendar").select("*");
        return res.json(calendar)
    }

    const getById = (req, res) => {
        app.db('calendar')
        .where({ calendar_id: req.params.id })
        .first()
        .then(calendar => res.json(calendar))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'calendar does not exist!')

            const rowsDeleted = await app.db('calendar').del()
                .where({ calendar_id: req.params.id })
            existsOrError(rowsDeleted, 'calendar not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const calendar = req.body;
        try {
            const newcalendar = await knex("calendar").insert(calendar)
            res.json(newcalendar);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const calendar = req.body;
        const calendar_id = req.params.id;
        if (calendar_id) {
            try {
                await app
                    .db("calendar")
                    .update(calendar)
                    .where({ calendar_id: calendar_id })

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