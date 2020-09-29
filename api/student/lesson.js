const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'lesson does not exist!')
    
            const getIdLesson = await knex('lesson')
                .where({ lesson_id: req.params.id }).first()
            existsOrError(getIdLesson, 'lesson not found')

            res.json(getIdLesson)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getById }
}