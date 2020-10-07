let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('address', () => {
    describe('/POST address', () => {
        it('Check the registration of address', (done) => {
            let address = { 
                address_street: "rua abc",
                address_number: "1212",
                address_district: "california",
                address_city: "ilheus",
                address_state:  "BA"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/address/')
                .send(address) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET address', () => {
        it('GET testing all address', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/address/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    const get = async (req, res) => {
        const get = await knex('address').where({ address_id: 2 }).first()
        console.log(get);
    }
    
    describe('/GET/:id address', () => {
        it('GET in address by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/address/' + id)
            .end((err, res) => {
                res.body.should.have.property('address_id');
                res.body.should.have.property('address_street');
                res.body.should.have.property('address_number');
                res.body.should.have.property('address_district');
                res.body.should.have.property('address_city');
                res.body.should.have.property('address_state');
                done();
            });
  
        })
    })

    describe('/PUT address', () => {
        it('Check the change of address', (done) => {
            let address = { 
                address_street: "rua abc",
                address_number: "1212",
                address_district: "california",
                address_city: "ilheus",
                address_state:  "BA"
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/address/' + id)
                .send(address) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id address', () => {
        it('DEL in address by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/address/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

