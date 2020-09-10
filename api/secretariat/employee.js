const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const employee = await knex("employee")
            .select("employee_id", "person_name", "office_id", "employee_salary")
            .innerJoin("person", "person.person_id", "employee.person_id");
        return res.json(employee)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'employee does not exist!')
    
            const getIdEmployee = await knex('employee')
                .where({ employee_id: req.params.id }).first()
            existsOrError(getIdEmployee, 'employee not found')

            res.json(getIdEmployee)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'employee does not exist!')

            const rowsDeleted = await app.db('employee').del()
                .where({ employee_id: req.params.id })
            existsOrError(rowsDeleted, 'employee not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const employee = req.body;
        try {
            const newEmployee = await knex("employee").insert(employee)
            res.json(newEmployee);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const employee = req.body;
        const employee_id = req.params.id;
        try{
            existsOrError(employee_id, 'employee does not exist!')
            
            const attEmployee = await knex("employee")
                .update(employee)
                .where({ employee_id: employee_id })
            existsOrError(attEmployee, 'employee not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

    return { get, getById, post, put, remove }
}