const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator
    
    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'employeeDiscipline does not exist!')
    
            const getIdEmployeeDiscipline = await knex('employeeDiscipline')
                .where({ employeeDiscipline_id: req.params.id }).first()
            existsOrError(getIdEmployeeDiscipline, 'employeeDiscipline not found')

            res.json(getIdEmployeeDiscipline)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }
    return { getById}
}