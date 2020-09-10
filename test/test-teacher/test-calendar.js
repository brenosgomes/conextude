let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let id = "1"

describe('calendar', () => {
    describe('/POST calendar', () => {
        it('Check the registration of calendar', (done) => {
            let calendar = { 
                clas_id: "1",
                calendar_date: "2020/01/01",
                calendar_description: "aaaaa aaa  aaaaaa aa a a"
            }
            chai.request('http://localhost:5000')
                .post('/teacher/calendar/')
                .send(calendar) 
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });


    describe('/GET calendar', () => {
        it('GET testing all calendar', (done) => {
            chai.request('http://localhost:5000') 
                .get('/teacher/calendar/') 
                .end((err, res) => { 
                    res.should.have.status(200); 
                    res.body.should.be.a('array'); 
                done();
                });
        });
    });

    
    describe('/GET/:id calendar', () => {
        it('GET in calendar by ID', (done) => {
            chai.request('http://localhost:5000')
                .get('/teacher/calendar/' + id)
                .end((err, res) => {
                    res.body.should.have.property('calendar_id');
                    res.body.should.have.property('clas_id');
                    res.body.should.have.property('calendar_date');
                    res.body.should.have.property('calendar_description');
                    done();
                });
        })
    })

    describe('/PUT calendar', () => {
        it('Check the change of calendar', (done) => {
            let calendar = { 
                clas_id: "1",
                calendar_date: "2020/01/01",
                calendar_description: "aaaaa aaa  aaaaaa aa a a"
            }
            chai.request('http://localhost:5000')
                .put('/teacher/calendar/' + id)
                .send(calendar) 
                .end((err, res) => {
                  res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/DEL/:id calendar', () => {
        it('DEL in calendar by ID', (done) => {
            chai.request('http://localhost:5000')
                .delete('/teacher/calendar/' + id )
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
  
        })
    })
})

