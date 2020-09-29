const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const lesson = await knex("lesson").select("*");
        return res.json(lesson)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'lesson does not exist!')
    
            const getIdLesson = await knex('lesson')
                .where({ lesson_id: req.params.id }).first()
            existsOrError(getIdLesson, 'lesson not found')

            res.json(getIdLesson)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'lesson does not exist!')

            const rowsDeleted = await app.db('lesson').del()
                .where({ lesson_id: req.params.id })
            existsOrError(rowsDeleted, 'lesson not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const lesson = req.body;
        try {
            const newLesson = await knex("lesson").insert(lesson)
            res.json(newLesson);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const lesson = req.body;
        const lesson_id = req.params.id;
        try{
            existsOrError(lesson_id, 'lesson does not exist!')
            
            const attLesson = await knex("lesson")
                .update(lesson)
                .where({ lesson_id: lesson_id })
            existsOrError(attLesson, 'lesson not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}