let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('credit', () => {
    describe('/POST credit', () => {
        it('Check the registration of credit', (done) => {
            let credit = { 
                bulletin_id: 1,
                credit_credit: 8.2
            }
            chai.request('http://localhost:5000')
                .post('/teacher/credit/')
                .send(credit) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET credit', () => {
        it('GET testing all credit', (done) => {
            chai.request('http://localhost:5000') 
                .get('/teacher/credit/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id credit', () => {
        it('GET in credit by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/teacher/credit/' + id)
            .end((err, res) => {
                res.body.should.have.property('credit_id');
                res.body.should.have.property('bulletin_id');
                res.body.should.have.property('credit_credit');
                done();
            });
  
        })
    })

    describe('/PUT credit', () => {
        it('Check the change of credit', (done) => {
            let credit = { 
                bulletin_id: 1,
                credit_credit: 8.2
            }
              chai.request('http://localhost:5000')
                .put('/teacher/credit/' + id)
                .send(credit) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id credit', () => {
        it('DEL in credit by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/teacher/credit/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

