const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const getQuestionDiscipline = async (req, res) => {
        try {
          existsOrError(req.params.query, "question does not exist!");
    
          const getQuestion = await knex("question").select("*")
          .where("question_discipline", "like", `%${req.params.query}%`);

          existsOrError(getQuestion, "question not found");

          res.json( getQuestion );
          
        } catch (msg) {
          console.log(msg)
          return res.status(400).send(msg);
        }
      };

    const getQuestionOption = async (req, res) => {
      try {
        existsOrError(req.params.id, "question does not exist!");

        const getQuestion = await knex("question").select("*")
        .where("question_id", req.params.id);

        const getOption = await knex("option").select("*")
        .where("option.question_id", getQuestion[0].question_id);

        existsOrError(getQuestion, "question not found");
        existsOrError(getOption, "question not found");

        console.log(getQuestion[0].question_id);

        res.json({getQuestion, getOption});
            
      } catch (msg) {
        return res.status(400).send(msg);
      }
    }

      return { getQuestionDiscipline, getQuestionOption }
}