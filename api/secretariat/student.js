const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const student = await knex("student").select("*");
        return res.json(student)
    }

    const getById = (req, res) => {
        app.db('student')
        .where({ student_id: req.params.id })
        .first()
        .then(student => res.json(student))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'student does not exist!')

            const rowsDeleted = await app.db('student').del()
                .where({ student_id: req.params.id })
            existsOrError(rowsDeleted, 'student not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const student = req.body;
        try {
            const newStudent = await knex("student").insert(student)
            res.json(newStudent);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const student = req.body;
        const student_id = req.params.id;
        if (student_id) {
            try {
                await app
                    .db("student")
                    .update(student)
                    .where({ student_id: student_id })

                res.status(200).send();
            } catch (err) {
                console.log(err);
                res.status(500).send(err);
            }
        } else {
            return res.status(400);
        }
    }

    return { get, getById, post, put, remove }
}