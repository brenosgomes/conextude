const knex = require('../../config/db')

module.exports = app => {
    const { existsOrError } = app.api.validator

    const get = async (req, res) => {
        const calendar = await knex("calendar").select("*");
        return res.json(calendar)
    }

    const getById = async (req, res) => {
        try {
            existsOrError(req.params.id, 'calendar does not exist!')
    
            const getIdCalendar = await knex('calendar')
                .where({ calendar_id: req.params.id }).first()
            existsOrError(getIdCalendar, 'calendar not found')

            res.json(getIdCalendar)
        } catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'calendar does not exist!')

            const rowsDeleted = await app.db('calendar').del()
                .where({ calendar_id: req.params.id })
            existsOrError(rowsDeleted, 'calendar not found')

            res.status(204).send()
        }
        catch (msg) {
            return res.status(400).send(msg)
        }
    }

    const post = async (req, res) => {
        const calendar = req.body;
        try {
            const newcalendar = await knex("calendar").insert(calendar)
            res.json(newcalendar);
        }catch (err) {
            console.log(res);
            return res.status(500).send(err);
        }
    }

    const put = async (req, res) => {
        const calendar = req.body;
        const calendar_id = req.params.id;
        try{
            existsOrError(calendar_id, 'calendar does not exist!')
            
            const attCalendar = await knex("calendar")
                .update(calendar)
                .where({ calendar_id: calendar_id })
            existsOrError(attCalendar, 'calendar not found')
            
            res.status(200).send();
        } catch(msg) {
            return res.status(400).send(msg);   
        }
    }
    

    return { get, getById, post, put, remove }
}