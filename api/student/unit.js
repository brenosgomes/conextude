const knex = require('../../config/db')

module.exports = app => {    
    const { existsOrError } = app.api.validator
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'unit does not exist!')
    
            const getIdUnit = await knex("unit").select("*")
                            .innerJoin("credit", "unit.unit_id", "credit.unit_id")
                            .where({ student_id: req.params.id });
            existsOrError(getIdUnit, 'unit not found')
    
            res.json(getIdUnit)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { getById }
}