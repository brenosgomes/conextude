const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimidia does not exist!')

            const rows = await knex('student').where({ student_id: req.params.id}).first();

            const getIdMultimidia = await knex('multimidia')
                .where({ classroom_id: rows.classroom_id })
            existsOrError(getIdMultimidia, 'multimidia not found')

            res.json(getIdMultimidia)
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
    }

    return { getById }
}