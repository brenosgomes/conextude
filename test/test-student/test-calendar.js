let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('calendar', () => {
    describe('/GET/:id calendar', () => {
        it('GET in calendar by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/secretariat/calendar/' + id)
                .end((err, res) => {
                    res.body.should.have.property('calendar_id');
                    res.body.should.have.property('clas_id');
                    res.body.should.have.property('calendar_date');
                    res.body.should.have.property('calendar_description');
                    done();
                });
        })
    })
})