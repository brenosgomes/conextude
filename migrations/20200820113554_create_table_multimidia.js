
exports.up = function(knex) {
    return knex.schema.createTable("multimidia", table => {
        table.increments("multimidia_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("multimidia_description").notNull();
        table.string("multimidia_link").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("multimidia")
};

