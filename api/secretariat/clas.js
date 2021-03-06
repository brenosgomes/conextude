const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const clas = await knex("clas").select("*");
    return res.json(clas);
  };

  const getById = async (req, res) => {
    const { type } = req.headers;
    try {
      existsOrError(req.params.id, "clas does not exist!");
      if (type === "student_id") {
        const getIdClas = await knex("clas")
          .select(
            "clas_id",
            "clas.discipline_id",
            "discipline_name",
            "discipline_workload",
            "clas.employee_id",
            "person_name"
          )
          .innerJoin("employee", "clas.employee_id", "employee.employee_id")
          .innerJoin(
            "discipline",
            "clas.discipline_id",
            "discipline.discipline_id"
          )
          .innerJoin("person", "employee.person_id", "person.person_id")
          .where({ student_id: req.params.id })
          .then((clas) => {
            res.json(clas);
          });
      } else {
        const getIdClas = await knex("clas")
          .where({ clas_id: req.params.id })
          .first();
        existsOrError(getIdClas, "clas not found");
        res.json(getIdClas);
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      const rowsDeleted = await app
        .db("clas")
        .del()
        .where({ clas_id: req.params.id });
      existsOrError(rowsDeleted, "clas not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const clas = req.body;
    try {
      const newClas = await knex("clas").insert(clas);
      res.json(newClas);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const clas = req.body;
    const clas_id = req.params.id;

    try {
      existsOrError(clas_id, "clas does not exist!");

      const attClas = await knex("clas")
        .update(clas)
        .where({ clas_id: clas_id });
      existsOrError(attClas, "clas not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
