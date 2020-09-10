const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const address = await knex("address").select("*");
        return res.json(address)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'address does not exist!')
    
            const getIdAddress = await knex('address')
                .where({ address_id: req.params.id }).first()
            existsOrError(getIdAddress, 'address not found')

            res.json(getIdAddress)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'address does not exist!')

            const rowsDeleted = await app.db('address').del()
                .where({ address_id: req.params.id })
            existsOrError(rowsDeleted, 'address not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const address = req.body;
        try {
            const newAddress = await knex("address").insert(address)
            res.json(newAddress);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const address = req.body;
        const address_id = req.params.id;
        try{
            existsOrError(address_id, 'address does not exist!')
            
            const attAddress = await knex("address")
                .update(address)
                .where({ address_id: address_id })
            existsOrError(attAddress, 'address not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}