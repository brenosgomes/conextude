const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const answer = await knex("answer").select("*");
        return res.json(answer)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'answer does not exist!')
    
            const getIdAnswer = await knex('answer')
                .where({ answer_id: req.params.id }).first()
            existsOrError(getIdAnswer, 'answer not found')

            res.json(getIdAnswer)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'answer does not exist!')

            const rowsDeleted = await app.db('answer').del()
                .where({ answer_id: req.params.id })
            existsOrError(rowsDeleted, 'answer not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const answer = req.body;
        try {
            const newAnswer = await knex("answer").insert(answer)
            res.json(newAnswer);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const answer = req.body;
        const answer_id = req.params.id;
        try{
            existsOrError(answer_id, 'answer does not exist!')
            
            const attAnswer = await knex("answer")
                .update(answer)
                .where({ answer_id: answer_id })
            existsOrError(attAnswer, 'answer not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}