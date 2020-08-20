
exports.up = function(knex) {
    return knex.schema.createTable("bulletin", table => {
        table.increments("bulletin_id").primary();
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.integer("discipline_id").unsigned().notNull();
        table.foreign("discipline_id").references("discipline_id").inTable("discipline").onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("bulletin")
};
