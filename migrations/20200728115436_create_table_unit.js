
exports.up = function(knex) {
    return knex.schema.createTable("unit", table => {
        table.increments("unit_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("unit_unit").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("unit")
};
