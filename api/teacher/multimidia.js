const knex = require("../../config/db");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "multimidia does not exist!");

      const getIdMultimidia = await knex("multimidia").where({
        employee_id: req.params.id,
      });
      existsOrError(getIdMultimidia, "multimidia not found");

      res.json(getIdMultimidia);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "multimidia does not exist!");

      const rows = await knex("multimidia")
        .where({ multimidia_id: req.params.id })
        .first();

      const rowsDeleted = await knex("multimidia")
        .del()
        .where({ multimidia_id: rows.multimidia_id });

      existsOrError(rowsDeleted, "multimidia not found");

      fs.unlink(`tmp/uploads/${rows.multimidia_key}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("removed");
        }
      });

      console.log(rows.multimidia_key);

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
      const newMultimidia = await knex("multimidia").insert({
        classroom_id: req.body.classroom_id,
        employee_id: req.body.employee_id,
        multimidia_name: req.file.originalname,
        multimidia_size: req.file.size,
        multimidia_key: req.file.filename,
        multimidia_url: req.body.url,
        multimidia_description: req.body.multimidia_description,
      });
      return res.json(newMultimidia);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  return { getById, post, remove };
};
