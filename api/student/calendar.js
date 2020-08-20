const knex = require('../../config/db')

module.exports = app => {

    const get = (req, res) => {
        app.db('calendar')
        .where({ calendar_id: req.params.id })
        .first()
        .then(calendar => res.json(calendar))
    }

    return { get }
}