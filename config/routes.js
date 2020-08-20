module.exports = app => {
//secretariat
    app.route('/secretariat/address')
    .get(app.api.secretariat.address.get)
    .post(app.api.secretariat.address.post)

    app.route('/secretariat/address/:id')
    .get(app.api.secretariat.address.getById)
    .delete(app.api.secretariat.address.remove)
    .put(app.api.secretariat.address.put)

    app.route('/secretariat/person')
    .get(app.api.secretariat.person.get)
    .post(app.api.secretariat.person.post)

    app.route('/secretariat/person/:id')
    .get(app.api.secretariat.person.getById)
    .delete(app.api.secretariat.person.remove)
    .put(app.api.secretariat.person.put)

    app.route('/secretariat/office')
    .get(app.api.secretariat.office.get)
    .post(app.api.secretariat.office.post)

    app.route('/secretariat/office/:id')
    .get(app.api.secretariat.office.getById)
    .delete(app.api.secretariat.office.remove)
    .put(app.api.secretariat.office.put)

    app.route('/secretariat/employee')
    .get(app.api.secretariat.employee.get)
    .post(app.api.secretariat.employee.post)

    app.route('/secretariat/employee/:id')
    .get(app.api.secretariat.employee.getById)
    .delete(app.api.secretariat.employee.remove)
    .put(app.api.secretariat.employee.put)

    app.route('/secretariat/clas')
    .get(app.api.secretariat.clas.get)
    .post(app.api.secretariat.clas.post)

    app.route('/secretariat/clas/:id')
    .get(app.api.secretariat.clas.getById)
    .delete(app.api.secretariat.clas.remove)
    .put(app.api.secretariat.clas.put)

    app.route('/secretariat/student')
    .get(app.api.secretariat.student.get)
    .post(app.api.secretariat.student.post)

    app.route('/secretariat/student/:id')
    .get(app.api.secretariat.student.getById)
    .delete(app.api.secretariat.student.remove)
    .put(app.api.secretariat.student.put)
    
    app.route('/secretariat/discipline')
    .get(app.api.secretariat.discipline.get)
    .post(app.api.secretariat.discipline.post)

    app.route('/secretariat/discipline/:id')
    .get(app.api.secretariat.discipline.getById)
    .delete(app.api.secretariat.discipline.remove)
    .put(app.api.secretariat.discipline.put)

    app.route('/secretariat/employeeDiscipline')
    .get(app.api.secretariat.employeeDiscipline.get)
    .post(app.api.secretariat.employeeDiscipline.post)

    app.route('/secretariat/employeeDiscipline/:id')
    .get(app.api.secretariat.employeeDiscipline.getById)
    .delete(app.api.secretariat.employeeDiscipline.remove)
    .put(app.api.secretariat.employeeDiscipline.put)

    app.route('/secretariat/bulletin')
    .get(app.api.secretariat.bulletin.get)
    .post(app.api.secretariat.bulletin.post)

    app.route('/secretariat/bulletin/:id')
    .get(app.api.secretariat.bulletin.getById)
    .delete(app.api.secretariat.bulletin.remove)
    .put(app.api.secretariat.bulletin.put)

    app.route('/secretariat/calendar')
    .get(app.api.secretariat.calendar.get)
    .post(app.api.secretariat.calendar.post)

    app.route('/secretariat/calendar/:id')
    .get(app.api.secretariat.calendar.getById)
    .delete(app.api.secretariat.calendar.remove)
    .put(app.api.secretariat.calendar.put)

    app.route('/secretariat/payment')
    .get(app.api.secretariat.payment.get)
    .post(app.api.secretariat.payment.post)

    app.route('/secretariat/payment/:id')
    .get(app.api.secretariat.payment.getById)
    .delete(app.api.secretariat.payment.remove)
    .put(app.api.secretariat.payment.put)

//student 
    app.route('/student/student/:id')
    .get(app.api.student.student.get)

    app.route('/student/bulletin/:id')
    .get(app.api.student.bulletin.get)

    app.route('/student/calendar/:id')
    .get(app.api.student.calendar.get)

    app.route('/student/multimidia/:id')
    .get(app.api.student.multimidia.get)

    app.route('/student/payment/:id')
    .get(app.api.student.payment.get)

//teacher
    app.route('/teacher/clas/:id')
    .get(app.api.teacher.clas.getById)

    app.route('/teacher/employeeDiscipline/:id')
    .get(app.api.teacher.employeeDiscipline.getById)

    app.route('/teacher/bulletin')
    .get(app.api.teacher.bulletin.get)
    .post(app.api.teacher.bulletin.post)

    app.route('/teacher/bulletin/:id')
    .get(app.api.teacher.bulletin.getById)
    .delete(app.api.teacher.bulletin.remove)
    .put(app.api.teacher.bulletin.put)

    app.route('/teacher/credit')
    .get(app.api.teacher.credit.get)
    .post(app.api.teacher.credit.post)

    app.route('/teacher/credit/:id')
    .get(app.api.teacher.credit.getById)
    .delete(app.api.teacher.credit.remove)
    .put(app.api.teacher.credit.put)

    app.route('/teacher/scraps')
    .get(app.api.teacher.scraps.get)
    .post(app.api.teacher.scraps.post)

    app.route('/teacher/scraps/:id')
    .get(app.api.teacher.scraps.getById)
    .delete(app.api.teacher.scraps.remove)
    .put(app.api.teacher.scraps.put)

    app.route('/teacher/calendar')
    .get(app.api.teacher.calendar.get)
    .post(app.api.teacher.calendar.post)

    app.route('/teacher/calendar/:id')
    .get(app.api.teacher.calendar.getById)
    .delete(app.api.teacher.calendar.remove)
    .put(app.api.teacher.calendar.put)

    app.route('/teacher/multimidia')
    .get(app.api.teacher.multimidia.get)
    .post(app.api.teacher.multimidia.post)

    app.route('/teacher/multimidia/:id')
    .get(app.api.teacher.multimidia.getById)
    .delete(app.api.teacher.multimidia.remove)
    .put(app.api.teacher.multimidia.put)

//adm
    app.route('/administrator')
    .get(app.api.administrator.get)
    .post(app.api.administrator.post)

    app.route('/administrator/:id')
    .get(app.api.administrator.getById)
    .delete(app.api.administrator.remove)
    .put(app.api.administrator.put)
}