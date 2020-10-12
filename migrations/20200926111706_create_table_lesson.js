
exports.up = function(knex) {
    return knex.schema.createTable("lesson", table => {
        table.increments("lesson_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.string("lesson_topic").notNull();
        table.date("lesson_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("lesson")
};

