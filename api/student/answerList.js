const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const answerList = await knex("answerList").select("*");
        return res.json(answerList)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'answerList does not exist!')
    
            const getIdAnswerList = await knex('answerList')
                .where({ answerList_id: req.params.id }).first()
            existsOrError(getIdAnswerList, 'answerList not found')

            res.json(getIdAnswerList)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'answerList does not exist!')

            const rowsDeleted = await app.db('answerList').del()
                .where({ answerList_id: req.params.id })
            existsOrError(rowsDeleted, 'answerList not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const answerList = req.body;
        try {
            const newAnswerList = await knex("answerList").insert(answerList)
            res.json(newAnswerList);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const answerList = req.body;
        const answerList_id = req.params.id;
        try{
            existsOrError(answerList_id, 'answerList does not exist!')
            
            const attAnswerList = await knex("answerList")
                .update(answerList)
                .where({ answerList_id: answerList_id })
            existsOrError(attAnswerList, 'answerList not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}