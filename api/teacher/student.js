const knex = require("../../config/db");

module.exports = (app) => {

    const get = async (req, res) => {
        try{
            const student = await knex("student")
                .innerJoin("person", "person.person_id", "student.person_id")
                .innerJoin("classroom", "classroom.classroom_id", "student.classroom_id")
                .select(
                    "student.student_id",
                    "person.person_name",
                    "classroom.classroom_name",
                    "student.student_registration"
                ).where("person.person_name", "like", `%${req.params.query}%`);

            return res.json(student);
        } catch (msg){
            console.log(msg)
            return res.status(400).send(msg);  
        }
    }
    return { get };  
}
