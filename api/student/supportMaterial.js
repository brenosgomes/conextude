const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'supportMaterial does not exist!')

            const rows = await knex('student').where({ student_id: req.params.id}).first();

            const getIdSupportMaterial = await knex('supportMaterial')
                .where({ classroom_id: rows.classroom_id })
            existsOrError(getIdSupportMaterial, 'supportMaterial not found')

            res.json(getIdSupportMaterial)
        } catch (msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
    }

    return { getById }
}