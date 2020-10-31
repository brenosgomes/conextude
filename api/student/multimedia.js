const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimedia does not exist!')

            const rows = await knex('student').where({ student_id: req.params.id}).first();

            const getIdMultimedia = await knex('multimedia')
                .where({ classroom_id: rows.classroom_id })
            existsOrError(getIdMultimedia, 'multimedia not found')

            res.json(getIdMultimedia)
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
    }

    return { getById }
}