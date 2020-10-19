
exports.up = function(knex) {
    return knex.schema.createTable("multimidia", table => {
        table.increments("multimidia_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.integer("employee_id").unsigned().notNull();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.string("multimidia_name").notNull();
        table.string("multimidia_size").notNull();
        table.string("multimidia_key").notNull();
        table.string("multimidia_url").notNull();
        table.string("multimidia_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("multimidia")
};

