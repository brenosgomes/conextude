const knex = require("../../config/db");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const question = await knex("question").select("*");
    return res.json(question)
}

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "question does not exist!");

      const getIdquestion = await knex("question").where({
        employee_id: req.params.id,
      });
      existsOrError(getIdquestion, "question not found");

      res.json(getIdquestion);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "question does not exist!");

      const rows = await knex("question")
        .where({ question_id: req.params.id })
        .first();

      const rowsDeleted = await knex("question")
        .del()
        .where({ question_id: rows.question_id });

      existsOrError(rowsDeleted, "question not found");

      fs.unlink(`tmp/img/${rows.question_key}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("removed");
        }
      });

      res.status(204).send();
    } catch (msg) {
      console.log(msg);
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    console.log(req.file);
    if (!req.body.url)
      req.body.url = `http://localhost:5000/files/${req.file.filename}`;
    try {
      const newquestion = await knex("question").insert({
        question_id: req.body.question_id,
        question_name: req.file.originalname,
        question_size: req.file.size,
        question_key: req.file.filename,
        question_url: req.body.url,
        question_question: req.body.question_question,
        question_description: req.body.question_description,
      });
      return res.json(newquestion);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const option = req.body;
    const option_id = req.params.id;
    try{
        existsOrError(option_id, 'option does not exist!')
        
        const attOption = await knex("option")
            .update(option)
            .where({ option_id: option_id })
        existsOrError(attOption, 'option not found')
        
        res.status(200).send();
    } catch(msg) {
        return res.status(400).send(msg);   
    }
}

  return { get, getById, post, remove, put };
};
