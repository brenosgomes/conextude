
exports.up = function(knex) {
    return knex.schema.createTable("observation", table => {
        table.increments("observation_id").primary();
        table.string("observation_observation").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("observation")
};
