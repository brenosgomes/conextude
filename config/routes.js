const multer = require("multer");
const multerConfig = require("../config/multer");
const multerConfigImg = require("../config/multerQuestion");

module.exports = (app) => {
  //secretariat
  app
    .route("/secretariat/address")
    .get(app.api.secretariat.address.get)
    .post(app.api.secretariat.address.post);

  app
    .route("/secretariat/address/:id")
    .get(app.api.secretariat.address.getById)
    .delete(app.api.secretariat.address.remove)
    .put(app.api.secretariat.address.put);

  app
    .route("/secretariat/person")
    .get(app.api.secretariat.person.get)
    .post(app.api.secretariat.person.post);

  app
    .route("/secretariat/person/:id")
    .get(app.api.secretariat.person.getById)
    .delete(app.api.secretariat.person.remove)
    .put(app.api.secretariat.person.put);

  app
    .route("/secretariat/office")
    .get(app.api.secretariat.office.get)
    .post(app.api.secretariat.office.post);

  app
    .route("/secretariat/office/:id")
    .get(app.api.secretariat.office.getById)
    .delete(app.api.secretariat.office.remove)
    .put(app.api.secretariat.office.put);

  app
    .route("/secretariat/employee")
    .get(app.api.secretariat.employee.get)
    .post(app.api.secretariat.employee.post);

  app
    .route("/secretariat/employee/:id")
    .get(app.api.secretariat.employee.getById)
    .delete(app.api.secretariat.employee.remove)
    .put(app.api.secretariat.employee.put);

  app
    .route("/secretariat/clas")
    .get(app.api.secretariat.classroom.get)
    .post(app.api.secretariat.classroom.post);

  app
    .route("/secretariat/clas/:id")
    .get(app.api.secretariat.classroom.getById)
    .delete(app.api.secretariat.classroom.remove)
    .put(app.api.secretariat.classroom.put);

  app
    .route("/secretariat/student")
    .get(app.api.secretariat.student.get)
    .post(app.api.secretariat.student.post);

  app
    .route("/secretariat/student/:id")
    .get(app.api.secretariat.student.getById)
    .delete(app.api.secretariat.student.remove)
    .put(app.api.secretariat.student.put);

  app
    .route("/secretariat/discipline")
    .get(app.api.secretariat.discipline.get)
    .post(app.api.secretariat.discipline.post);

  app
    .route("/secretariat/discipline/:id")
    .get(app.api.secretariat.discipline.getById)
    .delete(app.api.secretariat.discipline.remove)
    .put(app.api.secretariat.discipline.put);

  app
    .route("/secretariat/employeeDiscipline")
    .get(app.api.secretariat.clas.get)
    .post(app.api.secretariat.clas.post);

  app
    .route("/secretariat/employeeDiscipline/:id")
    .get(app.api.secretariat.clas.getById)
    .delete(app.api.secretariat.clas.remove)
    .put(app.api.secretariat.clas.put);

  app
    .route("/secretariat/unit")
    .get(app.api.secretariat.unit.get)
    .post(app.api.secretariat.unit.post);

  app
    .route("/secretariat/unit/:id")
    .get(app.api.secretariat.unit.getById)
    .delete(app.api.secretariat.unit.remove)
    .put(app.api.secretariat.unit.put);

  app
    .route("/secretariat/calendar")
    .get(app.api.secretariat.calendar.get)
    .post(app.api.secretariat.calendar.post);

  app
    .route("/secretariat/calendar/:id")
    .get(app.api.secretariat.calendar.getById)
    .delete(app.api.secretariat.calendar.remove)
    .put(app.api.secretariat.calendar.put);

  app
    .route("/secretariat/payment")
    .get(app.api.secretariat.payment.get)
    .post(app.api.secretariat.payment.post);

  app
    .route("/secretariat/payment/:id")
    .get(app.api.secretariat.payment.getById)
    .delete(app.api.secretariat.payment.remove)
    .put(app.api.secretariat.payment.put);

  app
    .route("/secretariat/option")
    .get(app.api.secretariat.option.get)
    .post(app.api.secretariat.option.post);

  app
    .route("/secretariat/option/:id")
    .get(app.api.secretariat.option.getById)
    .delete(app.api.secretariat.option.remove)
    .put(app.api.secretariat.option.put);

  app
    .route("/secretariat/question")
    .get(app.api.secretariat.question.get)
    .post(
      multer(multerConfigImg).single("file"),
      app.api.secretariat.question.post
    );

  app
    .route("/secretariat/question/:id")
    .get(app.api.secretariat.question.getById)
    .delete(app.api.secretariat.question.remove)
    .put(app.api.secretariat.question.put);

  //student
  app.route("/student/student/:id").get(app.api.student.student.getById);

  app.route("/student/unit/:id").get(app.api.student.unit.getById);

  app.route("/student/calendar/:id").get(app.api.student.calendar.getById);

  app
    .route("/student/supportMaterial/:id")
    .get(app.api.student.supportMaterial.getById);

  app.route("/student/payment/:id").get(app.api.student.payment.getById);

  app.route("/student/lesson/:id").get(app.api.student.lesson.getById);

  app.route("/student/fault/:id").get(app.api.student.fault.getById);

  app
    .route("/student/observation/:id")
    .get(app.api.student.observation.getById);

  app.route("/student/clas/:id").get(app.api.student.clas.getClas);

  app.route("/student/discipline/:id").get(app.api.student.clas.getInfo);

  app
    .route("/student/topic")
    .get(app.api.student.topic.get)
    .post(app.api.student.topic.post);

  app
    .route("/student/topic/:id")
    .get(app.api.student.topic.getById)
    .delete(app.api.student.topic.remove)
    .put(app.api.student.topic.put);

  app
    .route("/student/answer")
    .get(app.api.student.answer.get)
    .post(app.api.student.answer.post);

  app
    .route("/student/answer/:id")
    .get(app.api.student.answer.getById)
    .delete(app.api.student.answer.remove)
    .put(app.api.student.answer.put);

  app
    .route("/student/answerList")
    .get(app.api.student.answerList.get)
    .post(app.api.student.answerList.post);

  app
    .route("/student/answerList/:id")
    .get(app.api.student.answerList.getById)
    .delete(app.api.student.answerList.remove)
    .put(app.api.student.answerList.put);

  app.route("/student/multimedia/:id").get(app.api.student.multimedia.getById);

  //teacher
  app.route("/teacher/classroom/:id").get(app.api.teacher.classroom.getById);

  app
    .route("/teacher/unit")
    .get(app.api.teacher.unit.get)
    .post(app.api.teacher.unit.post);

  app
    .route("/teacher/unit/:id")
    .get(app.api.teacher.unit.getById)
    .delete(app.api.teacher.unit.remove)
    .put(app.api.teacher.unit.put);

  app
    .route("/teacher/grade")
    .get(app.api.teacher.grade.get)
    .post(app.api.teacher.grade.post);

  app
    .route("/teacher/grade/:id")
    .get(app.api.teacher.grade.getById)
    .delete(app.api.teacher.grade.remove)
    .put(app.api.teacher.grade.put);

  app
    .route("/teacher/scraps")
    .get(app.api.teacher.scraps.get)
    .post(app.api.teacher.scraps.post);

  app
    .route("/teacher/scraps/:id")
    .get(app.api.teacher.scraps.getById)
    .delete(app.api.teacher.scraps.remove)
    .put(app.api.teacher.scraps.put);

  app
    .route("/teacher/calendar")
    .get(app.api.teacher.calendar.get)
    .post(app.api.teacher.calendar.post);

  app
    .route("/teacher/calendar/:id")
    .get(app.api.teacher.calendar.getById)
    .delete(app.api.teacher.calendar.remove)
    .put(app.api.teacher.calendar.put);

  app
    .route("/teacher/supportMaterial")
    .post(
      multer(multerConfig).single("file"),
      app.api.teacher.supportMaterial.post
    );

  app
    .route("/teacher/supportMaterial/:id")
    .get(app.api.teacher.supportMaterial.getById)
    .delete(app.api.teacher.supportMaterial.remove);

  app
    .route("/teacher/topic")
    .get(app.api.teacher.topic.get)
    .post(app.api.teacher.topic.post);

  app
    .route("/teacher/topic/:id")
    .get(app.api.teacher.topic.getById)
    .delete(app.api.teacher.topic.remove)
    .put(app.api.teacher.topic.put);

  app
    .route("/teacher/answer")
    .get(app.api.teacher.answer.get)
    .post(app.api.teacher.answer.post);

  app
    .route("/teacher/answer/:id")
    .get(app.api.teacher.answer.getById)
    .delete(app.api.teacher.answer.remove)
    .put(app.api.teacher.answer.put);

  app
    .route("/teacher/observation")
    .get(app.api.teacher.observation.get)
    .post(app.api.teacher.observation.post);

  app
    .route("/teacher/observation/:id")
    .get(app.api.teacher.observation.getById)
    .delete(app.api.teacher.observation.remove)
    .put(app.api.teacher.observation.put);

  app
    .route("/teacher/lesson")
    .get(app.api.teacher.lesson.get)
    .post(app.api.teacher.lesson.post);

  app
    .route("/teacher/lesson/:id")
    .get(app.api.teacher.lesson.getById)
    .delete(app.api.teacher.lesson.remove)
    .put(app.api.teacher.lesson.put);

  app
    .route("/teacher/fault")
    .get(app.api.teacher.fault.get)
    .post(app.api.teacher.fault.post);

  app
    .route("/teacher/fault/:id")
    .get(app.api.teacher.fault.getById)
    .delete(app.api.teacher.fault.remove)
    .put(app.api.teacher.fault.put);

  app
    .route("/teacher/answerList")
    .get(app.api.teacher.answerList.get)
    .post(app.api.teacher.answerList.post);

  app
    .route("/teacher/answerList/:id")
    .get(app.api.teacher.answerList.getById)
    .delete(app.api.teacher.answerList.remove)
    .put(app.api.teacher.answerList.put);

  app
    .route("/teacher/multimedia")
    .get(app.api.teacher.multimedia.get)
    .post(app.api.teacher.multimedia.post);

  app
    .route("/teacher/multimedia/:id")
    .get(app.api.teacher.multimedia.getById)
    .delete(app.api.teacher.multimedia.remove)
    .put(app.api.teacher.multimedia.put);

  app.route("/teacher/student/:query").get(app.api.teacher.student.get);

  app
    .route("/teacher/question/:query")
    .get(app.api.teacher.question.getQuestionDiscipline);

  app
    .route("/teacher/questionn/:id")
    .get(app.api.teacher.question.getQuestionOption);

  app.route("/teacher/getClas/:id").get(app.api.teacher.clas.getClas);

  app
    .route("/teacher/getDiscipline/:id")
    .get(app.api.teacher.clas.getDiscipline);

  app.route("/teacher/getClassroom/:id").get(app.api.teacher.clas.getClassroom);

  //adm
  app
    .route("/administrator")
    .get(app.api.administrator.get)
    .post(app.api.administrator.post);

  app
    .route("/administrator/:id")
    .get(app.api.administrator.getById)
    .delete(app.api.administrator.remove)
    .put(app.api.administrator.put);

  app.route("/login").get(app.api.login.get).post(app.api.login.post);

  app
    .route("/login/:id")
    .get(app.api.login.getById)
    .delete(app.api.login.remove)
    .put(app.api.login.put);

  app.route("/auth").post(app.api.loginAuth.signIn);
  app.route("/token").post(app.api.loginAuth.validateToken);
};
