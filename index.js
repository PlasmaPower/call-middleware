var isGeneratorFunction = require('is-generator-function');

module.exports = function (mw, context, next) {
  if (context.wrappers) {
    context.wrappers.forEach(wrapper => mw = wrapper(mw));
  }
  if (typeof mw !== 'function') throw new TypeError('Middleware must be a function!');
  if (isGeneratorFunction(mw)) {
    throw new TypeError('Middleware should not be a generator! ' +
      'Are you sure you didn\'t forget a wrapper?');
  }
  return mw(context, next);
};
