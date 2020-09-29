const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const fault = await knex("fault").select("*");
        return res.json(fault)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'fault does not exist!')
    
            const getIdFault = await knex('fault')
                .where({ fault_id: req.params.id }).first()
            existsOrError(getIdFault, 'fault not found')

            res.json(getIdFault)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'fault does not exist!')

            const rowsDeleted = await app.db('fault').del()
                .where({ fault_id: req.params.id })
            existsOrError(rowsDeleted, 'fault not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const fault = req.body;
        try {
            const newFault = await knex("fault").insert(fault)
            res.json(newFault);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const fault = req.body;
        const fault_id = req.params.id;
        try{
            existsOrError(fault_id, 'fault does not exist!')
            
            const attFault = await knex("fault")
                .update(fault)
                .where({ fault_id: fault_id })
            existsOrError(attFault, 'fault not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}