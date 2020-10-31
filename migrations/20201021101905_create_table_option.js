
exports.up = function(knex) {
    return knex.schema.createTable("option", table => {
        table.increments("option_id").primary();
        table.integer("question_id").unsigned().notNull();
        table.foreign("question_id").references("question_id").inTable("question").onDelete('CASCADE');
        table.boolean("option_flag").notNull();
        table.string("option_option").notNull();
        table.string("option_answer").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("option")
};

