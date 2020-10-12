
exports.up = function(knex) {
    return knex.schema.createTable("person", table => {
        table.increments("person_id").primary();
        table.integer("address_id").unsigned().notNull();
        table.foreign("address_id").references("address_id").inTable("address");
        table.string("person_name").notNull();
        table.string("person_cpf").notNull();
        table.string("person_rg").notNull();
        table.string("person_email").notNull();
        table.string("person_phoneNumber").notNull();  
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("person")
};
