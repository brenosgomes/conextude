const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const credit = await knex("credit").select("*");
        return res.json(credit)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'credit does not exist!')
    
            const getIdCredit = await knex('credit')
                .where({ credit_id: req.params.id }).first()
            existsOrError(getIdCredit, 'credit not found')

            res.json(getIdCredit)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'credit does not exist!')

            const rowsDeleted = await app.db('credit').del()
                .where({ credit_id: req.params.id })
            existsOrError(rowsDeleted, 'credit not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const credit = req.body;
        try {
            const newcredit = await knex("credit").insert(credit)
            res.json(newcredit);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const credit = req.body;
        const credit_id = req.params.id;
        try{
            existsOrError(credit_id, 'credit does not exist!')
            
            const attCredit = await knex("credit")
                .update(credit)
                .where({ credit_id: credit_id })
            existsOrError(attCredit, 'credit not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}