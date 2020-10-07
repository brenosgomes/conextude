const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const grade = await knex("grade").select("*");
        return res.json(grade)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'grade does not exist!')
    
            const getIdGrade = await knex('grade')
                .where({ grade_id: req.params.id }).first()
            existsOrError(getIdGrade, 'grade not found')

            res.json(getIdGrade)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'grade does not exist!')

            const rowsDeleted = await app.db('grade').del()
                .where({ grade_id: req.params.id })
            existsOrError(rowsDeleted, 'grade not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const grade = req.body;
        try {
            const newGrade = await knex("grade").insert(grade)
            res.json(newGrade);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const grade = req.body;
        const grade_id = req.params.id;
        try{
            existsOrError(grade_id, 'grade does not exist!')
            
            const attGrade = await knex("grade")
                .update(grade)
                .where({ grade_id: grade_id })
            existsOrError(attGrade, 'grade not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}