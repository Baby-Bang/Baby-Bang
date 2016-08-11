var request = require('supertest');

describe('loading express', function () {
    var server;

    beforeEach(function () {
        server = require('../server')();
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('responds to get /logIn', function testSlash(done) {
        request(server)
            .get('/logIn')
            .expect(200, done);
    });

    it('responds to post /logout', function testSlash(done) {
        request(server)
            .post('/logout')
            .expect(200, done);
    });

    it('responds to get /', function testPath(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('responds to post /logIn', function testPath(done) {
        request(server)
            .post('/logIn')
            .expect(200, done);
    });

    it('404 is a wrong path', function (done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});

