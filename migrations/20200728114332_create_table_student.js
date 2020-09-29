
exports.up = function(knex) {
    return knex.schema.createTable("student", table => {
        table.increments("student_id").primary();
        table.integer("person_id").unsigned().notNull();
        table.foreign("person_id").references("person_id").inTable("person").onDelete('CASCADE');
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.integer("observation_id").unsigned().notNull();
        table.foreign("observation_id").references("observation_id").inTable("observation").onDelete('CASCADE');
        table.string("student_registration").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("student")
};
