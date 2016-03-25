# Call Middleware

Calls [Koa](https://github.com/koajs/koa) middleware, utilizing the wrappers array in context.
Only accepts a non-generator context function (this is intended for Koa v2).

## Example Use

```js
callMiddleware(middleware, context, next);
```
