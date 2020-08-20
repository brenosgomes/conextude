
exports.up = function(knex) {
    return knex.schema.createTable("payment", table => {
        table.increments("payment_id").primary();
        table.integer("student_id").unsigned().notNull();
        table.foreign("student_id").references("student_id").inTable("student").onDelete('CASCADE');
        table.string("payment_billet").notNull();
        table.string("payment_value").notNull();
        table.string("payment_type").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("payment")
};
