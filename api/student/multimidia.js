const knex = require('../../config/db')

module.exports = app => {

    const get = (req, res) => {
        app.db('multimidia')
        .where({ multimidia_id: req.params.id })
        .first()
        .then(multimidia => res.json(multimidia))
    }

    return { get }
}