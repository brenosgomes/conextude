let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('employee', () => {
    describe('/POST employee', () => {
        it('Check the registration of employee', (done) => {
            let employee = { 
                person_id: 1,
                office_id: 1, 
                employee_salary: 4000.00
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/employee/')
                .send(employee) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
              });
        });

    });


    describe('/GET employee', () => {
        it('GET testing all employee', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/employee/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id employee', () => {
        it('GET in employee by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/employee/' + id)
            .end((err, res) => {
                res.body.should.have.property('employee_id');
                res.body.should.have.property('person_id');
                res.body.should.have.property('office_id');
                res.body.should.have.property('employee_salary');
                done();
            });
  
        })
    })

    describe('/PUT employee', () => {
        it('Check the change of employee', (done) => {
            let employee = { 
                person_id: 1,
                office_id: 1, 
                employee_salary: 4000.00
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/employee/' + id)
                .send(employee) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id employee', () => {
        it('DEL in employee by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/employee/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

