
const chai = require('chai');
const expect = chai.expect;
const pasteBud = require('./');

describe('PasteBud', () => {
  // it('rejects when command is null', (done) => {
  //   pasteBud(null).catch((err) => {
  //     expect(err).to.contain('command can be get or post');
  //     done();
  //   });
  // });
  // it('rejects when command is not post or get', (done) => {
  //   pasteBud('wrong').catch((err) => {
  //     expect(err).to.contain('command can be get or post');
  //     done();
  //   });
  // });

  // describe('post', () => {
  //   it('receive an id when post', (done) => {
  //     pasteBud('post', 'example').then((id) => {
  //       expect(id).to.not.be.null;
  //       done();
  //     });
  //   });
  // });

  describe('get', () => {
    it('get a post value from an id', (done) => {
      const expectedValue = 'example2';
      pasteBud('post', expectedValue).then((id) => {
        pasteBud('get', id).then((value) => {
          console.log(value)
          expect(value).to.equal(expectedValue);
          done();
        });
      });
    });
  });
});

