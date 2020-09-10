let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('employeeDiscipline', () => {
    describe('/GET/:id clas', () => {
        it('GET in clas by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/teacher/clas/' + id)
                .end((err, res) => {
                    res.body.should.have.property('clas_id');
                    res.body.should.have.property('clas_name');
                    res.body.should.have.property('clas_series');
                    res.body.should.have.property('clas_timetable');
                    done();
                });
  
        })
    })

})