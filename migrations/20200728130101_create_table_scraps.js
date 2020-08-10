
exports.up = function(knex) {
    return knex.schema.createTable("scraps", table => {
        table.increments("scraps_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas");
        table.string("scraps_scraps").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("scraps")
};

