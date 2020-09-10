let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('person', () => {
    describe('/POST person', () => {
        it('Check the registration of person', (done) => {
            let person = { 
                address_id: 2,
                person_name: "Breno",
                person_cpf: "090.123.333-00",
                person_rg: "12.323.111-111",
                person_email: "breno@hotmail.com",
                person_phoneNumber: "8888-9999",
                person_login: "breno",
                person_password: "123123"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/person/')
                .send(person) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET person', () => {
        it('GET testing all person', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/person/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id person', () => {
        it('GET in person by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/person/' + id)
            .end((err, res) => {
                res.body.should.have.property('person_id');
                res.body.should.have.property('address_id');
                res.body.should.have.property('person_name');
                res.body.should.have.property('person_cpf');
                res.body.should.have.property('person_rg');
                res.body.should.have.property('person_email');
                res.body.should.have.property('person_phoneNumber');
                res.body.should.have.property('person_login');
                res.body.should.have.property('person_password');
                done();
            });
  
        })
    })

    describe('/PUT person', () => {
        it('Check the change of person', (done) => {
            let person = { 
                address_id: 2,
                person_name: "Breno",
                person_cpf: "090.123.333-00",
                person_rg: "12.323.111-111",
                person_email: "breno@hotmail.com",
                person_phoneNumber: "8888-9999",
                person_login: "breno",
                person_password: "123123"
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/person/' + id)
                .send(person) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id person', () => {
        it('DEL in person by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/person/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

