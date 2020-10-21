
exports.up = function(knex) {
    return knex.schema.createTable("question", table => {
        table.increments("question_id").primary();
        table.string("question_name").notNull();
        table.string("question_size").notNull();
        table.string("question_key").notNull();
        table.string("question_url").notNull();
        table.string("question_question").notNull();
        table.string("question_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("question")
};

