exports.up = function (knex) {
  return knex("office")
    .del()
    .then(function () {
      return knex("office").insert([
        { office_id: 1, office_name: "Professor" },
        { office_id: 2, office_name: "Secretaria" },
      ]);
    });
};

exports.down = function (knex) {
  return knex("office").del();
};
