const knex = require('../../config/db')

module.exports = app => {
    const getById = (req, res) => {
        app.db('clas')
        .where({ clas_id: req.params.id })
        .first()
        .then(clas => res.json(clas))
    }
    return { getById}
}