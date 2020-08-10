
exports.up = function(knex) {
    return knex.schema.createTable("administrator", table => {
        table.increments("administrator_id").primary();
        table.string("administrator_login").notNull();
        table.string("administrator_password").notNull();       
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("administrator")
};
