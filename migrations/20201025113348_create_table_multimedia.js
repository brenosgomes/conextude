
exports.up = function(knex) {
    return knex.schema.createTable("multimedia", table => {
        table.increments("multimedia_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.string("multimedia_title").notNull();
        table.string("multimedia_url").notNull();
        table.string("multimedia_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("multimedia")
};

