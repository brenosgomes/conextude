
exports.up = function(knex) {
    return knex.schema.createTable("topic", table => {
        table.increments("topic_id").primary();
        table.integer("student_id").unsigned().nullable();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.integer("employee_id").unsigned().nullable();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.string("topic_topic").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("topic")
};

