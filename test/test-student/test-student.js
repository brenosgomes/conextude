let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('student', () => {
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
})