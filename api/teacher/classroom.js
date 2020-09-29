const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'classroom does not exist!')
    
            const getIdClassroom = await knex('classroom')
                .where({ classroom_id: req.params.id }).first()
            existsOrError(getIdClassroom, 'classroom not found')

            res.json(getIdClassroom)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }
    return { getById }
}