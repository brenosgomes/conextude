
exports.up = function(knex) {
    return knex.schema.createTable("answerList", table => {
        table.increments("answerList_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.integer("list_id").unsigned().notNull();
        table.foreign("list_id").references("list_id").inTable("list").onDelete('CASCADE');
        table.string("answerList_punctuation").notNull();
        table.string("answerList_answers").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("answerList")
};

