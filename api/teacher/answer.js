const knex = require("../../config/db");

function compareAnswers(a, b) {
  if (a.answer_id < b.answer_id) {
    return -1;
  }
  if (a.answer_id > b.answer_id) {
    return 1;
  }
  return 0;
}

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const { id } = req.headers;

    const answerEmployee = await knex("answer")
      .innerJoin("employee", "employee.employee_id", "answer.employee_id")
      .innerJoin("person", "person.person_id", "employee.person_id")
      .where("topic_id", id)
      .orderBy("answer_id", "asc")
      .select("*");

    const answerStudent = await knex("answer")
      .innerJoin("student", "student.student_id", "answer.student_id")
      .innerJoin("person", "person.person_id", "student.person_id")
      .where("topic_id", id)
      .orderBy("answer_id", "asc")
      .select("*");

    const answer = [...answerEmployee, ...answerStudent];
    console.log(answer);

    answer.sort(compareAnswers);

    console.log(answer);
    return res.json(answer);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "answer does not exist!");

      const getIdAnswer = await knex("answer")
        .where({ answer_id: req.params.id })
        .first();
      existsOrError(getIdAnswer, "answer not found");

      res.json(getIdAnswer);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "answer does not exist!");

      const rowsDeleted = await app
        .db("answer")
        .del()
        .where({ answer_id: req.params.id });
      existsOrError(rowsDeleted, "answer not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const answer = req.body;
    try {
      const newAnswer = await knex("answer").insert(answer);
      res.json(newAnswer);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const answer = req.body;
    const answer_id = req.params.id;
    try {
      existsOrError(answer_id, "answer does not exist!");

      const attAnswer = await knex("answer")
        .update(answer)
        .where({ answer_id: answer_id });
      existsOrError(attAnswer, "answer not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};