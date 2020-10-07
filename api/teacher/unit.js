const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const unit = await knex("unit").select("*");
        return res.json(unit)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'unit does not exist!')
    
            const getIdUnit = await knex('unit')
                .where({ unit_id: req.params.id }).first()
            existsOrError(getIdUnit, 'unit not found')

            res.json(getIdUnit)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'unit does not exist!')

            const rowsDeleted = await knex('unit').del()
                .where({ unit_id: req.params.id })
            existsOrError(rowsDeleted, 'unit not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const unit = req.body;
        try {
            const newUnit = await knex("unit").insert(unit)
            res.json(newUnit);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const unit = req.body;
        const unit_id = req.params.id;
        try{
            existsOrError(unit_id, 'unit does not exist!')
            
            const attUnit = await knex("unit")
                .update(unit)
                .where({ unit_id: unit_id })
            existsOrError(attUnit, 'unit not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}