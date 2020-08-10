
exports.up = function(knex) {
    return knex.schema.createTable("discipline", table => {
        table.increments("discipline_id").primary();
        table.string("discipline_name").notNull();
        table.string("discipline_workload").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("discipline")
};
