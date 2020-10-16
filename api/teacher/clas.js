const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const getClas = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      employee_id = req.params.id;

      const getIdSelectClas = await knex("employee")
        .select(
          "clas.clas_id",
          "person.person_name",
          "classroom.classroom_name",
          "discipline.discipline_id",
          "discipline.discipline_name"
        )
        .innerJoin("clas", "employee.employee_id", "clas.employee_id")
        .innerJoin("student", "student.student_id", "clas.student_id")
        .innerJoin(
          "discipline",
          "discipline.discipline_id",
          "clas.discipline_id"
        )
        .innerJoin(
          "classroom",
          "classroom.classroom_id",
          "student.classroom_id"
        )
        .innerJoin("person", "person.person_id", "student.person_id")
        .where("employee.employee_id", req.params.id);
      existsOrError(getIdSelectClas, "clas not found");

      res.json(getIdSelectClas);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getDiscipline = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      discipline_id = req.params.id;

      const getIdSelectClas = await knex("employee")
        .select(
          "person.person_id",
          "person.person_name",
          "classroom.classroom_name",
          "classroom.classroom_id"
        )
        .innerJoin("clas", "employee.employee_id", "clas.employee_id")
        .innerJoin("student", "student.student_id", "clas.student_id")
        .innerJoin(
          "classroom",
          "classroom.classroom_id",
          "student.classroom_id"
        )
        .innerJoin("person", "person.person_id", "student.person_id")
        .where("employee.employee_id", employee_id)
        .where("clas.discipline_id", req.params.id);
      existsOrError(getIdSelectClas, "clas not found");

      res.json(getIdSelectClas);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const getClassroom = async (req, res) => {
    try {
      existsOrError(req.params.id, "clas does not exist!");

      const getIdSelectClas = await knex("employee")
        .select(
          "clas.clas_id",
          "person.person_name",
          "classroom.classroom_name"
        )
        .innerJoin("clas", "employee.employee_id", "clas.employee_id")
        .innerJoin("student", "student.student_id", "clas.student_id")
        .innerJoin(
          "classroom",
          "classroom.classroom_id",
          "student.classroom_id"
        )
        .innerJoin("person", "person.person_id", "student.person_id")
        .where("employee.employee_id", employee_id)
        .where("clas.discipline_id", discipline_id)
        .where("student.classroom_id", req.params.id);
      existsOrError(getIdSelectClas, "clas not found");

      res.json(getIdSelectClas);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { getClas, getDiscipline, getClassroom };
};
