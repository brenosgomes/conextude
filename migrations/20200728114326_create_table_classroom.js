
exports.up = function(knex) {
    return knex.schema.createTable("classroom", table => {
        table.increments("classroom_id").primary();
        table.string("classroom_name").notNull();
        table.string("classroom_series").notNull();
        table.string("classroom_timetable").notNull();
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("classroom")
};
