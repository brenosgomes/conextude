
exports.up = function(knex) {
    return knex.schema.createTable("calendar", table => {
        table.increments("calendar_id").primary();
        table.integer("clas_id").unsigned().notNull();
        table.foreign("clas_id").references("clas_id").inTable("clas").onDelete('CASCADE');
        table.date("calendar_date").notNull();
        table.string("calendar_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("calendar")
};

