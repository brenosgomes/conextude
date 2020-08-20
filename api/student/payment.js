const knex = require('../../config/db')

module.exports = app => {

    const get = (req, res) => {
        app.db('payment')
        .where({ payment_id: req.params.id })
        .first()
        .then(payment => res.json(payment))
    }

    return { get }
}