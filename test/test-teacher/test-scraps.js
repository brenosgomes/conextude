let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('scraps', () => {
    describe('/POST scraps', () => {
        it('Check the registration of scraps', (done) => {
            let scraps = { 
                clas_id: 1,
                scraps_scraps: "12dhdfgsdrgrgs12"
            }
            chai.request('http://localhost:5000')
                .post('/teacher/scraps/')
                .send(scraps) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('/GET scraps', () => {
        it('GET testing all scraps', (done) => {
            chai.request('http://localhost:5000') 
                .get('/teacher/scraps/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id scraps', () => {
        it('GET in scraps by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/teacher/scraps/' + id)
            .end((err, res) => {
                res.body.should.have.property('scraps_id');
                res.body.should.have.property('clas_id');
                res.body.should.have.property('scraps_scraps');
                done();
            });
        })
    })

    describe('/PUT scraps', () => {
        it('Check the change of scraps', (done) => {
            let scraps = { 
                clas_id: 1,
                scraps_scraps: "12dhdfgsdrgrgs12"
            }
              chai.request('http://localhost:5000')
                .put('/teacher/scraps/' + id)
                .send(scraps) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id scraps', () => {
        it('DEL in scraps by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/teacher/scraps/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        })
    })
})

