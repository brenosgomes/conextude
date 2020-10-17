const knex = require("../../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const multimidia = await knex("multimidia")
      .select(
        "multimidia.multimidia_id",
        "multimidia.multimidia_description",
        "multimidia.multimidia_link"
      )
      .innerJoin(
        "classroom",
        "classroom.classroom_id",
        "multimidia.classroom_id"
      );
    return res.json(multimidia);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "multimida does not exist!");

      const getIdMultimida = await knex("multimida")
        .where({ multimida_id: req.params.id })
        .first();
      existsOrError(getIdMultimida, "multimida not found");

      res.json(getIdMultimida);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "multimidia does not exist!");

      const rowsDeleted = await app
        .db("multimidia")
        .del()
        .where({ multimidia_id: req.params.id });
      existsOrError(rowsDeleted, "multimidia not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const multimidia = req.body;
    try {
      const newmultimidia = await knex("multimidia").insert(multimidia);
      res.json(newmultimidia);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const multimidia = req.body;
    const multimidia_id = req.params.id;
    try {
      existsOrError(multimida_id, "multimida does not exist!");

      const attMultimida = await knex("multimida")
        .update(multimida)
        .where({ multimida_id: multimida_id });
      existsOrError(attMultimida, "multimida not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, put, remove };
};
