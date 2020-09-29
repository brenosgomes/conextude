
exports.up = function(knex) {
    return knex.schema.createTable("lesson", table => {
        table.increments("lesson_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.string("lesson_topic").notNull();
        table.date("lesson_date").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("lesson")
};

