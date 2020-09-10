let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('multimidia', () => {
    describe('/POST multimidia', () => {
        it('Check the registration of multimidia', (done) => {
            let multimidia = { 
                clas_id: 1,
                multimidia_archive: "12asdgargarg12",
                multimidia_description: "agargtewfaefae",
                multimidia_link: "aaaaaaaaaa"
            }
            chai.request('http://localhost:5000')
                .post('/teacher/multimidia/')
                .send(multimidia) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET multimidia', () => {
        it('GET testing all multimidia', (done) => {
            chai.request('http://localhost:5000') 
                .get('/teacher/multimidia/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id multimidia', () => {
        it('GET in multimidia by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/teacher/multimidia/' + id)
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

    describe('/PUT multimidia', () => {
        it('Check the change of multimidia', (done) => {
            let multimidia = { 
                clas_id: 1,
                multimidia_archive: "12asdgargarg12",
                multimidia_description: "agargtewfaefae",
                multimidia_link: "aaaaaaaaaa"
            }
              chai.request('http://localhost:5000')
                .put('/teacher/multimidia/' + id)
                .send(multimidia) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id multimidia', () => {
        it('DEL in multimidia by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/teacher/multimidia/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

