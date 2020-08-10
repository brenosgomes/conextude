const knex = require('../../config/db')

module.exports = app => {

    const get = (req, res) => {
        app.db('student')
        .where({ student_id: req.params.id })
        .first()
        .then(student => res.json(student))
    }

    return { get }
}