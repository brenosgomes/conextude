const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'calendar does not exist!')

            const getIdCalendar = await knex('calendar')
                .where({ calendar_id: req.params.id }).first()
            existsOrError(getIdCalendar, 'calendar not found')

            res.json(getIdCalendar)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getById }
}