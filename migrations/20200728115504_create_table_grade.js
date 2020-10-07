
exports.up = function(knex) {
    return knex.schema.createTable("grade", table => {
        table.increments("grade_id").primary();
        table.integer("unit_id").unsigned().notNull();
        table.foreign("unit_id").references("unit_id").inTable("unit").onDelete('CASCADE');
        table.float("grade_grade").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("grade")
};
