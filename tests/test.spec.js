// Index Spec
const { after, afterEach, before, beforeEach, describe, it } = require('mocha');
const { expect/* , assert, should */ } = require('chai');
// const { mock, spy, stub } = require('sinon');
const { JSDOM } = require('jsdom');

describe('Testing Function Test', () => {
  describe('Test Spec', () => {
    before(() => {
      // before all tests
    });
    beforeEach(() => {
      // before each test
    });
    after(() => {
      // after all tests
    });
    afterEach(() => {
      // after each test
    });
    describe('Array Test', () => {
      it('expect to return (-1) when the value is not present', () => {
        expect([1, 2, 3].indexOf(4)).to.equal(-1);
      });
      it('expect to return (0) when the value is present', () => {
        expect([1, 2, 3].indexOf(2)).to.be.above(-1);
      });
      it('expect the correct length of (3)', () => {
        expect([1, 2, 3]).to.have.length(3);
      });
      it('expect correct type: (Array)', () => {
        expect([1, 2, 3]).to.be.instanceof(Array);
      });
      // it('expect the correct length of (3)', () => {
      //   expect([1, 2, 3]).to.have.length(2);
      // });
    });
  });

  describe('JSDOM Test', () => {
    before(() => JSDOM.fromFile('./assets/src/tests/test-templates/test.template.html', { runScripts: 'dangerously', url: 'http://localhost' })
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      }));
    beforeEach(() => {
      // before each test
    });
    after(() => {
      window.close();
    });
    afterEach(() => {
      // after each test
    });
    describe('NodeList Test', () => {
      it('expect NodeList converted to an Array so we can check instance type (Array)', () => {
        expect(Array.from(document.querySelectorAll('.list-item'))).to.be.instanceof(Array);
      });
      it('expect NodeList converted to an Array to check correct length of (4)', () => {
        expect(Array.from(document.querySelectorAll('.list-item'))).to.have.length(4);
      });
      it('expect type of classname to be a (string)', () => {
        expect(typeof document.querySelectorAll('.list-item')[0].classList[0]).to.equal('string');
      });
      it('expect classname to be (list-item)', () => {
        expect(document.querySelectorAll('.list-item')[0].classList[0]).to.equal('list-item');
      });
    });
  });
});
