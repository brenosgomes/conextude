const knex = require('../../config/db')

module.exports = app => {    
    const { existsOrError } = app.api.validator
    const get = async (req, res) => {
        try {
            existsOrError(req.params.id, 'bulletin does not exist!')
    
            const getIdBulletin = await knex("bulletin").select("*")
                            .innerJoin("credit", "bulletin.bulletin_id", "credit.bulletin_id")
                            .where({ student_id: req.params.id });
            existsOrError(getIdBulletin, 'bulletin not found')
    
            res.json(getIdBulletin)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    return { get }
}