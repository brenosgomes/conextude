
exports.up = function(knex) {
    return knex.schema.createTable("multimidia", table => {
        table.increments("multimidia_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.string("multimidia_description").notNull();
        table.string("multimidia_link").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("multimidia")
};

