let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('employeeDiscipline', () => {
    describe('/POST employeeDiscipline', () => {
        it('Check the registration of employeeDiscipline', (done) => {
            let employeeDiscipline = { 
                employee_id: 1,
                discipline_id: 1,
                clas_id: 1
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/employeeDiscipline/')
                .send(employeeDiscipline) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
              });
        });

    });


    describe('/GET employeeDiscipline', () => {
        it('GET testing all employeeDiscipline', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/employeeDiscipline/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id employeeDiscipline', () => {
        it('GET in employeeDiscipline by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/employeeDiscipline/' + id)
            .end((err, res) => {
                res.body.should.have.property('employeeDiscipline_id');
                res.body.should.have.property('employee_id');
                res.body.should.have.property('discipline_id');
                res.body.should.have.property('clas_id');
                done();
            });
  
        })
    })

    describe('/PUT employeeDiscipline', () => {
        it('Check the change of employeeDiscipline', (done) => {
            let employeeDiscipline = { 
                employee_id: 1,
                discipline_id: 1,
                clas_id: 1
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/employeeDiscipline/' + id)
                .send(employeeDiscipline) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id employeeDiscipline', () => {
        it('DEL in employeeDiscipline by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/employeeDiscipline/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

