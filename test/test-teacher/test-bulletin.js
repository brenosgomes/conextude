let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('bulletin', () => {
    describe('/POST bulletin', () => {
        it('Check the registration of bulletin', (done) => {
            let bulletin = { 
                student_id: 1,
                discipline_id: 1
            }
            chai.request('http://localhost:5000')
                .post('/teacher/bulletin/')
                .send(bulletin) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET bulletin', () => {
        it('GET testing all bulletin', (done) => {
            chai.request('http://localhost:5000') 
                .get('/teacher/bulletin/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                done();
                });
        });
    });

    
    describe('/GET/:id bulletin', () => {
        it('GET in bulletin by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/teacher/bulletin/' + id)
                .end((err, res) => {
                    res.body.should.have.property('student_id');
                    res.body.should.have.property('discipline_id');
                    done();
                });
  
        })
    })

    describe('/PUT bulletin', () => {
        it('Check the change of bulletin', (done) => {
            let bulletin = { 
                student_id: 1,
                discipline_id: 1
            }
            chai.request('http://localhost:5000')
                .put('/teacher/bulletin/' + id)
                .send(bulletin) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id bulletin', () => {
        it('DEL in bulletin by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/teacher/bulletin/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

