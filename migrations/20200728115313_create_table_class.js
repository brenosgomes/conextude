
exports.up = function(knex) {
    return knex.schema.createTable("clas", table => {
        table.increments("clas_id").primary();
        table.integer("employee_id").unsigned().notNull();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.integer("discipline_id").unsigned().notNull();
        table.foreign("discipline_id").references("discipline_id").inTable("discipline").onDelete('CASCADE');
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("clas")
};
