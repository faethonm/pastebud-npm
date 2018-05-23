'use strict'

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const request = require('request')

const pasteBud = require('./');

const expect = chai.expect;
chai.use(sinonChai);

describe('PasteBud', () => {
  let sinonSandbox;
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    // Restore all the things made through the sandbox
    sinonSandbox.restore();
  });

  it('rejects when command is null', (done) => {
    pasteBud(null).catch((err) => {
      expect(err).to.contain('command can be get or post');

      done();
    });
  });
  it('rejects when command is not post or get', (done) => {
    pasteBud('wrong').catch((err) => {
      expect(err).to.contain('command can be get or post');
      done();
    });
  });

  describe('post', () => {
    it('receive an id when post', (done) => {
      sinonSandbox.stub(request, 'post').callsFake((options, cb) => {
        cb(null, { statusCode: 200 }, {content: 'test'});
      });
      pasteBud('post', 'example').then((id) => {
        expect(id).to.not.be.null;
        done();
      });
    });

    it('reject if error', (done) => {
      sinonSandbox.stub(request, 'post').callsFake((options, cb) => {
        cb('ERROR', { statusCode: 401 }, '');
      });

      pasteBud('post', 'example').catch((err) => {
        expect(err).to.equal('ERROR')
        done();
      })
    })
  });

  describe('get', () => {
    it('get a post value from an id', (done) => {
      const id = 'testId';
      sinonSandbox.stub(request, 'get').callsFake((options, cb) => {
        cb(null, {
          statusCode: 200 ,
          body: JSON.stringify({ content: 'test' })
        })
      });

      pasteBud('get', id).then((content) => {
        expect(content).to.equal('test');
        done();
      });
    });

    it('reject if error', (done) => {
      sinonSandbox.stub(request, 'post').callsFake((options, cb) => {
        cb('ERROR', { statusCode: 401, body: 'ERROR' });
      });

      pasteBud('post', 'example').catch((err) => {
        expect(err).to.equal('ERROR')
        done();
      })
    })
  });
});

