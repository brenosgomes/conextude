
exports.up = function(knex) {
    return knex.schema.createTable("scraps", table => {
        table.increments("scraps_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.string("scraps_title").notNull();
        table.string("scraps_description", [5000]).notNull();
        table.date("scraps_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("scraps")
};

