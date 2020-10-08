
exports.up = function(knex) {
    return knex.schema.createTable("observation", table => {
        table.increments("observation_id").primary();
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.string("observation_observation").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("observation")
};
