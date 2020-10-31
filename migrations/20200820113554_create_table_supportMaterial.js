
exports.up = function(knex) {
    return knex.schema.createTable("supportMaterial", table => {
        table.increments("supportMaterial_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.integer("employee_id").unsigned().notNull();
        table.foreign("employee_id").references("employee_id").inTable("employee").onDelete('CASCADE');
        table.string("supportMaterial_name").notNull();
        table.string("supportMaterial_size").notNull();
        table.string("supportMaterial_key").notNull();
        table.string("supportMaterial_url").notNull();
        table.string("supportMaterial_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("supportMaterial")
};

