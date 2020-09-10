let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "19"

describe('administrator', () => {
    describe('/POST administrator', () => {
        it('Check the registration of administrator', (done) => {
            let administrator = { 
                administrator_login:"marcus", 
                administrator_password:"1234", 
                administrator_confirm_password: "1234"
            }
              chai.request('http://localhost:5000')
              .post('/administrator/')
              .send(administrator) 
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
        });

    });


    describe('/GET administrator', () => {
        it('GET testing all administrators', (done) => {
            chai.request('http://localhost:5000') 
                .get('/administrator/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                done();
                });
        });
    });

    
    describe('/GET/:id administrator', () => {
        it('GET in administrator by ID', (done) => {
              chai.request('http://localhost:5000')
              .get('/administrator/' + id)
              .end((err, res) => {
                res.body.should.have.property('administrator_id');
                res.body.should.have.property('administrator_login');
                res.body.should.have.property('administrator_password');
                done();
              });
  
        })
    })

    describe('/PUT administrator', () => {
        it('Check the change of administrator', (done) => {
            let administrator = { 
                administrator_login:"valb", 
                administrator_password:"1234"
            }
              chai.request('http://localhost:5000')
              .put('/administrator/' + id)
              .send(administrator) 
              .end((err, res) => {
                  res.should.have.status(200);
                done();
              });
        });

    });

    describe('/DEL/:id administrator', () => {
        it('DEL in administrator by ID', (done) => {
              chai.request('http://localhost:5000')
              .delete('/administrator/' + id )
              .end((err, res) => {
                  res.should.have.status(204);
                done();
              });
  
        })
    })
})

