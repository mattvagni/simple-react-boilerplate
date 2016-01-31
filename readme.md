#### What is this?
This is all the annoying boilerplate needed for a simple client-side only react app with sass.

It supports writing tests, sourcemaps in development and minification in 'production'.

Overall it's as paired down as possible. It's good for a quick MVP or
some internal tool - def. needs more work for anything else. This is probably not for you.

#### Setup
```
npm install
```

#### Commands
- To watch for javascript changes and re-build on change: `grunt watch-js`
- To watch for CSS changes and re-build on change: `grunt css`
- To run javascript tests: `grunt test`
- To build css & javascript for 'production' (minified): `grunt build`. You can also build javascript or css separately by running `grunt build-js` and `grunt-build-css` respectively.
- To serve the localhost html file just do `grunt serve`. *Note:* this will serve the index.html file in the root on all paths of localhost. This makes it super easy if you want to start using something like react-router etc.
