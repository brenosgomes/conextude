const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const knex = require("../config/db");

module.exports = (app) => {
  const signIn = async (req, res) => {
    if (!req.body.login_login || !req.body.login_password) {
      return res.status(400).send("Insira login e senha");
    }

    const user = await knex("login")
      .where({ login_login: req.body.login_login })
      .first();

    if (!user) return res.status(400).send("login não encontrado");

    const isMatch = bcrypt.compareSync(
      req.body.login_password,
      user.login_password
    );
    if (!isMatch)
      return res.status(401).send("Combinação de login e senha inválida!");

    const now = Date.now();

    payload = {
      id: user.login_id,
      login: user.login_login,
      password: user.login_password,
      employee_id: user.employee_id,
      student_id: user.student_id,
      flag: user.login_flag,
      iat: now,
      exp: now + 1000 * 60 * 60 * 24,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = (req, res) => {
    const { userData } = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.status(200).json({
            success: true,
            employee_id: token.employee_id,
            student_id: token.student_id,
            flag: token.flag,
          });
        }
      }
    } catch (e) {
      res.status(401);
    }
    res.send(false);
  };

  return { signIn, validateToken };
};
