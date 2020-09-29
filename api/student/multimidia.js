const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'multimidia does not exist!')

            const getIdMultimidia = await knex('multimidia')
                .where({ multimidia_id: req.params.id }).first()
            existsOrError(getIdMultimidia, 'multimidia not found')

            res.json(getIdMultimidia)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getById }
}