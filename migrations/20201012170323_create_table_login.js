
exports.up = function(knex) {
    return knex.schema.createTable("login", table => {
        table.increments("login_id").primary();
        table.integer("student_id").unsigned();
        table.foreign("student_id").references("student_id").inTable("student");
        table.integer("employee_id").unsigned();
        table.foreign("employee_id").references("employee_id").inTable("employee");
        table.string("login_flag").notNull();
        table.string("login_login").notNull();
        table.string("login_password").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("login")
};
