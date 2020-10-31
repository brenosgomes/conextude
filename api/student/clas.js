const knex = require("../../config/db");

module.exports = (app) => {
    const { existsOrError } = app.api.validator;

    const getClas = async (req, res) => {
        try {
            existsOrError(req.params.id, "clas does not exist!");

            student = req.params.id

            const getIdSelectClas = await knex("student").select("*")
                .innerJoin("clas", "student.student_id", "clas.student_id")
                .where("clas.student_id", req.params.id);

            existsOrError(getIdSelectClas, "clas not found");
            res.json(getIdSelectClas);
        } catch (msg) {
            return res.status(400).send(msg);
        }
    }

    const getInfo = async (req, res) => {
        try {
            existsOrError(req.params.id, "clas does not exist!");

            const getIdSelectClas = await knex("student")
                .select("discipline.discipline_name", "fault.fault_date","unit.unit_unit", "grade.grade_grade")
                .innerJoin("clas", "student.student_id", "clas.student_id")
                .innerJoin("fault", "clas.clas_id", "fault.clas_id")
                .innerJoin("unit", "clas.clas_id", "unit.clas_id")
                .innerJoin("discipline", "clas.discipline_id", "discipline.discipline_id")
                .innerJoin("grade", "unit.unit_id", "grade.unit_id")
                .where("clas.student_id", student)
                .where("clas.discipline_id", req.params.id);

            existsOrError(getIdSelectClas, "discipline not found");
            res.json(getIdSelectClas);
        } catch (msg) {
            return res.status(400).send(msg);
        }
    }

  return { getClas, getInfo };
}
