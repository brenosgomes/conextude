const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const employeeDiscipline = await knex("employeeDiscipline").select("*");
    return res.json(employeeDiscipline);
  };

  const getById = (req, res) => {
    const { type } = req.headers;

    const getById = async (req, res) => {
        const { type } = req.headers
        try {
            existsOrError(req.params.id, 'employeeDiscipline does not exist!')
            if(type === "clas_id"){
                const getIdEmployeeDiscipline = await knex("employeeDiscipline")
                .select(
                  "employeeDiscipline_id",
                  "employeeDiscipline.discipline_id",
                  "discipline_name",
                  "discipline_workload",
                  "employeeDiscipline.employee_id",
                  "person_name"
                )
                .innerJoin(
                  "employee",
                  "employeeDiscipline.employee_id",
                  "employee.employee_id"
                )
                .innerJoin(
                  "discipline",
                  "employeeDiscipline.discipline_id",
                  "discipline.discipline_id"
                )
                .innerJoin("person", "employee.person_id", "person.person_id")
                .where({ clas_id: req.params.id })
                .then((employeeDiscipline) => {
                  res.json(employeeDiscipline);
                });
            } else {
                const getIdEmployeeDiscipline = await knex('employeeDiscipline')
                    .where({ employeeDiscipline_id: req.params.id }).first()
                existsOrError(getIdEmployeeDiscipline, 'employeeDiscipline not found')
            }
            res.json(getIdEmployeeDiscipline)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "employeeDiscipline does not exist!");

      const rowsDeleted = await app
        .db("employeeDiscipline")
        .del()
        .where({ employeeDiscipline_id: req.params.id });
      existsOrError(rowsDeleted, "employeeDiscipline not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const employeeDiscipline = req.body;
    try {
      const newEmployeeDiscipline = await knex("employeeDiscipline").insert(
        employeeDiscipline
      );
      res.json(newEmployeeDiscipline);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

    const put = async (req, res) => {
        const employeeDiscipline = req.body;
        const employeeDiscipline_id = req.params.id;
        try{
            existsOrError(employeeDiscipline_id, 'employeeDiscipline does not exist!')
            
            const attEmployeeDiscipline = await knex("employeeDiscipline")
                .update(employeeDiscipline)
                .where({ employeeDiscipline_id: employeeDiscipline_id })
            existsOrError(attEmployeeDiscipline, 'employeeDiscipline not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }

  return { get, getById, post, put, remove };
};
