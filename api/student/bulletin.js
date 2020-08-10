const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const bulletin = await knex("bulletin").select("*")
                                .innerJoin("credit", "bulletin.bulletin_id", "credit.bulletin_id")
                                .where({ student_id: req.params.id });
        return res.json(bulletin)
    }

    return { get }
}