
exports.up = function(knex) {
    return knex.schema.createTable("list", table => {
        table.increments("list_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.string("list_title").notNull();
        table.string("list_questions").notNull();
        table.string("list_answers").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("list")
};

