
exports.up = function(knex) {
    return knex.schema.createTable("credit", table => {
        table.increments("credit_id").primary();
        table.integer("bulletin_id").unsigned().notNull();
        table.foreign("bulletin_id").references("bulletin_id").inTable("bulletin");
        table.float("credit_credit").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("credit")
};
