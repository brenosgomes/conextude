const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')
const knex = require('../config/db')

module.exports = app =>{
    const signIn = async (req, res) => {
        if(!req.body.administrator_login || !req.body.administrator_password){
            return res.status(400).send('Insira login e senha')
        }

        const user = await knex('administrador').where({administrator_login: req.body.login}).first()

        if(!user) return res.status(400).send('Administrador não encontrado')

        const isMatch = bcrypt.compareSync(req.body.administrator_password, user.administrator_password)
        if(!isMatch) return res.status(401).send('Combinação de login e senha inválida!')

        const now = Date.now()

        payload = {
            id: user.administrator_id,
            login: user.administrator_login,
            password: user.administrator_password,
            iat: now,
            exp: now + (1000 * 60 * 60 * 24)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = (req, res) => {
        const userData = req.body || null

        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date() ){
                    return res.send(true)
                }
            }
        }catch(e){
            res.status(401)
        }
        res.send(false)
    }

    return {signIn, validateToken}
}
