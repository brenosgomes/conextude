let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('payment', () => {
    describe('/POST payment', () => {
        it('Check the registration of payment', (done) => {
            let payment = { 
                student_id: "1",
                payment_billet: "1212",
                payment_value: "23141",
                payment_type: "1231"
            }
            chai.request('http://localhost:5000')
                .post('/secretariat/payment/')
                .send(payment) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET payment', () => {
        it('GET testing all payment', (done) => {
            chai.request('http://localhost:5000') 
                .get('/secretariat/payment/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                    done();
                });
        });
    });

    
    describe('/GET/:id payment', () => {
        it('GET in payment by ID', (done) => {
            chai.request('http://localhost:5000')
            .get('/secretariat/payment/' + id)
            .end((err, res) => {
                res.body.should.have.property('payment_id');
                res.body.should.have.property('student_id');
                res.body.should.have.property('payment_billet');
                res.body.should.have.property('payment_value');
                res.body.should.have.property('payment_type');
                done();
            });
  
        })
    })

    describe('/PUT payment', () => {
        it('Check the change of payment', (done) => {
            let payment = { 
                student_id: "1",
                payment_billet: "1212",
                payment_value: "23141",
                payment_type: "1231"
            }
              chai.request('http://localhost:5000')
                .put('/secretariat/payment/' + id)
                .send(payment) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id payment', () => {
        it('DEL in payment by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/secretariat/payment/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

