let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('student', () => {
    describe('/POST student', () => {
        it('Check the registration of student', (done) => {
            let student = { 
                person_id: 1,
                clas_id: 1,
                student_registration: "3332323231",
                student_payment: "aaaaaaaaaaaa"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/student/')
                .send(student) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET student', () => {
        it('GET testing all student', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/student/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id student', () => {
        it('GET in student by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/student/' + id)
            .end((err, res) => {
                res.body.should.have.property('student_id');
                res.body.should.have.property('person_id');
                res.body.should.have.property('clas_id');
                res.body.should.have.property('student_registration');
                res.body.should.have.property('student_payment');
                done();
            });
  
        })
    })

    describe('/PUT student', () => {
        it('Check the change of student', (done) => {
            let student = { 
                person_id: 1,
                clas_id: 1,
                student_registration: "3332323231",
                student_payment: "aaaaaaaaaaaa"
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/student/' + id)
                .send(student) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/DEL/:id student', () => {
        it('DEL in student by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/student/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

