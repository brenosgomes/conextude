let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('office', () => {
    describe('/POST office', () => {
        it('Check the registration of office', (done) => {
            let office = { 
                office_name: "Professor"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/office/')
                .send(office) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('/GET office', () => {
        it('GET testing all office', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/office/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id office', () => {
        it('GET in office by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/office/' + id)
            .end((err, res) => {
                res.body.should.have.property('office_id');
                res.body.should.have.property('office_name');
                done();
            });
  
        })
    })

    describe('/PUT office', () => {
        it('Check the change of office', (done) => {
            let office = { 
                office_name: "Diretor"
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/office/' + id)
                .send(office) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id office', () => {
        it('DEL in office by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/office/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

