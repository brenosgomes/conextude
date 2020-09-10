const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const payment = await knex("payment").select("*");
        return res.json(payment)
    }

    const getById = async (req, res) => {
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

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'payment does not exist!')

            const rowsDeleted = await app.db('payment').del()
                .where({ payment_id: req.params.id })
            existsOrError(rowsDeleted, 'payment not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const payment = req.body;
        try {
            const newpayment = await knex("payment").insert(payment)
            res.json(newpayment);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const payment = req.body;
        const payment_id = req.params.id;
        try{
            existsOrError(payment_id, 'payment does not exist!')
            
            const attPayment = await knex("payment")
                .update(payment)
                .where({ payment_id: payment_id })
            existsOrError(attPayment, 'payment not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}