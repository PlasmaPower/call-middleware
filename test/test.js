var assert = require('assert');
var co = require('co');
var callMiddleware = require('..');

describe('Call middleware', function () {
  it('should call the midleware', function () {
    assert.equal(callMiddleware(function (ctx, next) {
      return ctx.number + next();
    }, { number: 5 }, () => 3), 8);
  });

  it('should wrap the middleware with any provided wrappers', function () {
    return callMiddleware(function* (ctx, next) {
      return yield next();
    }, {
      wrappers: [co.wrap, function (fn) {
        return (ctx, next) => fn(ctx, next).then(n => n + 4);
      }]
    }, () => Promise.resolve(2)).then(n => assert.equal(n, 6));
  });

  it('should throw an error if given an object', function () {
    var err;
    try {
      callMiddleware({}, {}, () => {});
    } catch (e) {
      err = e;
    }
    assert(err instanceof TypeError);
  });

  it('should throw an error if given a generator', function () {
    var err;
    try {
      callMiddleware(function* () {}, {}, () => {});
    } catch (e) {
      err = e;
    }
    assert(err instanceof TypeError);
  });
});
