const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const bulletin = await knex("bulletin").select("*");
        return res.json(bulletin)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'bulletin does not exist!')
    
            const getIdBulletin = await knex('bulletin')
                .where({ bulletin_id: req.params.id }).first()
            existsOrError(getIdBulletin, 'bulletin not found')

            res.json(getIdBulletin)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'bulletin does not exist!')

            const rowsDeleted = await knex('bulletin').del()
                .where({ bulletin_id: req.params.id })
            existsOrError(rowsDeleted, 'bulletin not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const bulletin = req.body;
        try {
            const newBulletin = await knex("bulletin").insert(bulletin)
            res.json(newBulletin);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const bulletin = req.body;
        const bulletin_id = req.params.id;
        try{
            existsOrError(bulletin_id, 'bulletin does not exist!')
            
            const attBulletin = await knex("bulletin")
                .update(bulletin)
                .where({ bulletin_id: bulletin_id })
            existsOrError(attBulletin, 'bulletin not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}