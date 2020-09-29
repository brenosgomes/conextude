const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'fault does not exist!')
    
            const getIdFault = await knex('fault')
                .where({ fault_id: req.params.id }).first()
            existsOrError(getIdFault, 'fault not found')

            res.json(getIdFault)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    } 

    return { getById }
}