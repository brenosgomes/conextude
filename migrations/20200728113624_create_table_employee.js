
exports.up = function(knex) {
    return knex.schema.createTable("employee", table => {
        table.increments("employee_id").primary();
        table.integer("person_id").unsigned().notNull();
        table.foreign("person_id").references("person_id").inTable("person");
        table.integer("office_id").unsigned().notNull();
        table.foreign("office_id").references("office_id").inTable("office");
        table.float("employee_salary").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("employee")
};
