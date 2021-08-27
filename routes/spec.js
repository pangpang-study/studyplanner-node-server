const request = require('supertest');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const app = require('../index');
chai.use(http);

/**
 * Behavior Driven Development
 * 아직 잘 모르니 훈수 부탁드립니다.
 */


// TODO mock database 를 두고 해야 하는데 아직 잘 모르겠음. 공부 더 필요
describe('POST /api/v1/auth/join', () => {
    it('it should return 201 status code', (done) => {
        const test_user = {
            "email": "qwer1@naver.com",
            "nick": "QWER",
            "password": "1234",
        }
        request(app).post('/api/v1/auth/join')
            .send(test_user)
            .then((res) => {
                expect(res).to.have.status(201);
                console.log(res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
                done();
            });
    });

    it("it should return 200 status code", (done) => {
        const dup_user = {
            "email": "qwer@naver.com",
            "nick": "WERT",
            "password": "1234"
        }
        request(app).post('/api/v1/auth/join')
            .send(dup_user)
            .then((res) => {
                expect(res).to.have.status(200);
                console.log(res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
            });
    });
});

// POST /api/v1/auth/login
describe('POST /api/v1/auth/login', () => {
    it('it should return 200 status code', (done) => {
        const test_user = {
            "email": "qwer@naver.com",
            "password": "1234",
        }
        request(app).post('/api/v1/auth/login')
            .send(test_user)
            .then((res) => {
                expect(res).to.have.status(200);
                console.log(res.headers, res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
            });
    });

    it('it should return 401 status code', (done) => {
        const fake_user = {
            "email": "asdf@naver.com",
            "password": "1234",
        }
        request(app).post('/api/v1/auth/login')
            .send(fake_user)
            .then((res) => {
                expect(res).to.have.status(401);
                console.log(res.headers);
                console.log(res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
            });
    });

    it('it should return 401 status code', (done) => {
        const wrong_pwd = {
            "email": "qwer@naver.com",
            "password": "2345",
        }
        request(app).post('/api/v1/auth/login')
            .send(wrong_pwd)
            .then((res) => {
                expect(res).to.have.status(401);
                console.log(res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
            });
    });
});

// GET /api/v1/auth/logout
describe('GET /api/v1/auth/logout', () => {
    it('it should return 200 status code', (done) => {
        request(app).get('/api/v1/auth/logout')
            .then((res) => {
                expect(res).to.have.status(200);
                console.log(res.body);
                done();
            })
            .catch((err) => {
                console.error(err);
                done();
            });
    });
});

// TODO User BDD
// GET /api/v1/user
// describe('GET /api/v1/user', () => {
//     it('it should return 200 status code', (done) => {
//         request(app).get('/api/v1/user')
//             .then((res) => {
//                 expect(res).to.have.status(200);
//                 console.log(res.body);
//                 done();
//             })
//             .catch((err) => {
//                 console.error(err);
//                 done();
//             });
//     });
// });