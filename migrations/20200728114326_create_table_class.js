
exports.up = function(knex) {
    return knex.schema.createTable("clas", table => {
        table.increments("clas_id").primary();
        table.string("clas_name").notNull();
        table.string("clas_series").notNull();
        table.string("clas_timetable").notNull();
        table.string("clas_calendar").notNull();
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("clas")
};
