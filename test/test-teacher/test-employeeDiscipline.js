let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('employeeDiscipline', () => {
    describe('/GET/:id employeeDiscipline', () => {
        it('GET in employeeDiscipline by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/teacher/employeeDiscipline/' + id)
            .end((err, res) => {
                res.body.should.have.property('employeeDiscipline_id');
                res.body.should.have.property('employee_id');
                res.body.should.have.property('discipline_id');
                res.body.should.have.property('clas_id');
                done();
            });
        })
    })
})