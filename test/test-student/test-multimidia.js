let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('multimidia', () => {
    describe('/GET/:id multimidia', () => {
        it('GET in multimidia by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/secretariat/multimidia/' + id)
                .end((err, res) => {
                    res.body.should.have.property('multimidia_id');
                    res.body.should.have.property('clas_id');
                    res.body.should.have.property('multimidia_archive');
                    res.body.should.have.property('multimidia_description');
                    res.body.should.have.property('multimidia_link');
                    done();
                });
        })
    })
})