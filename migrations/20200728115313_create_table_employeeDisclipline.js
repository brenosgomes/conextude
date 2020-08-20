
exports.up = function(knex) {
    return knex.schema.createTable("employeeDiscipline", table => {
        table.increments("employeeDiscipline_id").primary();
        table.integer("employee_id").unsigned().notNull();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.integer("discipline_id").unsigned().notNull();
        table.foreign("discipline_id").references("discipline_id").inTable("discipline").onDelete('CASCADE');
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("employeeDiscipline")
};
