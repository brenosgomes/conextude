
exports.up = function(knex) {
    return knex.schema.createTable("fault", table => {
        table.increments("fault_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.date("fault_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("fault")
};

