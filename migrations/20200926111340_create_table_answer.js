
exports.up = function(knex) {
    return knex.schema.createTable("answer", table => {
        table.increments("answer_id").primary();
        table.integer("student_id").unsigned().nullable();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.integer("employee_id").unsigned().nullable();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.integer("topic_id").unsigned().notNull();
        table.foreign("topic_id").references("topic_id").inTable("topic").onDelete('CASCADE');
        table.string("answer_answer").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("answer")
};

