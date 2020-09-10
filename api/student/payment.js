const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'payment does not exist!')

            const getIdPayment = await knex('payment')
                .where({ payment_id: req.params.id }).first()
            existsOrError(getIdPayment, 'payment not found')

            res.json(getIdPayment)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { get }
}