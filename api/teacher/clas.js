const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'clas does not exist!')
    
            const getIdClas = await knex('clas')
                .where({ clas_id: req.params.id }).first()
            existsOrError(getIdClas, 'clas not found')

            res.json(getIdClas)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }
    return { getById}
}