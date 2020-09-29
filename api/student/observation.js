const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'observation does not exist!')

            const getIdObservation = await knex('observation')
                .where({ observation_id: req.params.id }).first()
            existsOrError(getIdObservation, 'observation not found')

            res.json(getIdObservation)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getById }
}