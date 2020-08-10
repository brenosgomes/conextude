const knex = require('../../config/db')

module.exports = app => {
    const getById = (req, res) => {
        app.db('employeeDiscipline')
        .where({ employeeDiscipline_id: req.params.id })
        .first()
        .then(employeeDiscipline => res.json(employeeDiscipline))
    }
    return { getById}
}