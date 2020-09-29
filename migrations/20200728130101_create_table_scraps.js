
exports.up = function(knex) {
    return knex.schema.createTable("scraps", table => {
        table.increments("scraps_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("scraps_title").notNull();
        table.string("scraps_description").notNull();
        table.date("scraps_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("scraps")
};

