const knex = require("../../config/db");

function compareTopics(a, b) {
  if (a.topic_id < b.topic_id) {
    return -1;
  }
  if (a.topic_id > b.topic_id) {
    return 1;
  }
  return 0;
}

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const topicStudent = await knex("topic")
      .select(
        "topic.topic_id",
        "person.person_name",
        "topic.student_id",
        "topic.topic_topic",
        "topic.topic_description"
      )
      .innerJoin("student", "student.student_id", "topic.student_id")
      .innerJoin("person", "student.person_id", "person.person_id");

    const topicEmployee = await knex("topic")
      .select(
        "topic.topic_id",
        "person.person_name",
        "topic.employee_id",
        "topic.topic_topic",
        "topic.topic_description"
      )
      .innerJoin("employee", "employee.employee_id", "topic.employee_id")
      .innerJoin("person", "employee.person_id", "person.person_id");

    topic = [...topicStudent, ...topicEmployee];

    topic.sort(compareTopics);

    return res.json(topic);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "topic does not exist!");

      const getIdTopic = await knex("topic")
        .where({ topic_id: req.params.id })
        .first();
      existsOrError(getIdTopic, "topic not found");

      res.json(getIdTopic);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "topic does not exist!");

      const rowsDeleted = await app
        .db("topic")
        .del()
        .where({ topic_id: req.params.id });
      existsOrError(rowsDeleted, "topic not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const topic = req.body;
    try {
      const newTopic = await knex("topic").insert(topic);
      res.json(newTopic);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const topic = req.body;
    const topic_id = req.params.id;
    try {
      existsOrError(topic_id, "topic does not exist!");

      const attTopic = await knex("topic")
        .update(topic)
        .where({ topic_id: topic_id });
      existsOrError(attTopic, "topic not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
