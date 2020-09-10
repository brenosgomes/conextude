let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('bulletin', () => {
    describe('/GET/:id bulletin', () => {
        it('GET in bulletin by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/secretariat/bulletin/' + id)
                .end((err, res) => {
                    res.body.should.have.property('student_id');
                    res.body.should.have.property('discipline_id');
                    done();
                });
  
        })
    })
})