let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('clas', () => {
    describe('/POST clas', () => {
        it('Check the registration of clas', (done) => {
            let clas = { 
                clas_name: "8ªA",
                clas_series: "8ª",
                clas_timetable: "asadadeas"
            }
              chai.request('http://localhost:5000')
              .post('/secretariat/clas/')
              .send(clas) 
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
        });

    });


    describe('/GET clas', () => {
        it('GET testing all clas', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/clas/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                done();
                });
        });
    });

    
    describe('/GET/:id clas', () => {
        it('GET in clas by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/secretariat/clas/' + id)
                .end((err, res) => {
                    res.body.should.have.property('clas_id');
                    res.body.should.have.property('clas_name');
                    res.body.should.have.property('clas_series');
                    res.body.should.have.property('clas_timetable');
                    done();
                });
  
        })
    })

    describe('/PUT clas', () => {
        it('Check the change of clas', (done) => {
            let clas = { 
                clas_name: "8ªA",
                clas_series: "8ª",
                clas_timetable: "asadadeas"
            }
            chai.request('http://localhost:5000')
                .put('/secretariat/clas/' + id)
                .send(clas) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id clas', () => {
        it('DEL in clas by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/clas/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

