let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('discipline', () => {
    describe('/POST discipline', () => {
        it('Check the registration of discipline', (done) => {
            let discipline = { 
                discipline_name: "historia",
                discipline_workload: "aaaaaaaaaaaaa"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/discipline/')
                .send(discipline) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET discipline', () => {
        it('GET testing all discipline', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/discipline/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id discipline', () => {
        it('GET in discipline by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/secretariat/discipline/' + id)
                .end((err, res) => {
                    res.body.should.have.property('discipline_id');
                    res.body.should.have.property('discipline_name');
                    res.body.should.have.property('discipline_workload');
                    done();
                });
        })
    })

    describe('/PUT discipline', () => {
        it('Check the change of discipline', (done) => {
            let discipline = { 
                discipline_name: "historia",
                discipline_workload: "aaaaaaaaaaaaa"
            }
            chai.request('http://localhost:5000')
                .put('/secretariat/discipline/' + id)
                .send(discipline) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id discipline', () => {
        it('DEL in discipline by ID', (done) => {
            chai.request('http://localhost:5000')
            .delete('/secretariat/discipline/' + id )
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
  
        })
    })
})

