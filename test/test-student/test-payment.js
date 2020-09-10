let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('payment', () => {
    describe('/GET/:id payment', () => {
        it('GET in payment by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/payment/' + id)
            .end((err, res) => {
                res.body.should.have.property('payment_id');
                res.body.should.have.property('student_id');
                res.body.should.have.property('payment_billet');
                res.body.should.have.property('payment_value');
                res.body.should.have.property('payment_type');
                done();
            });
  
        })
    })
})