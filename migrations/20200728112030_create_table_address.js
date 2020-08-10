exports.up = function(knex) {
    return knex.schema.createTable("address", table => {
        table.increments("address_id").primary();
        table.string("address_street").notNull();
        table.string("address_number").notNull();
        table.string("address_district").notNull();
        table.string("address_city").notNull();
        table.string("address_state").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("address")
};
