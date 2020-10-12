
exports.up = function(knex) {
    return knex.schema.createTable("calendar", table => {
        table.increments("calendar_id").primary();
        table.integer("classroom_id").unsigned().notNull();
        table.foreign("classroom_id").references("classroom_id").inTable("classroom").onDelete('CASCADE');
        table.date("calendar_date").notNull();
        table.string("calendar_description").notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("calendar")
};

