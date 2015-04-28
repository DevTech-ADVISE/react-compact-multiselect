# react-compact-multiselect

Get the AMD module located at `react-compact-multiselect.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactCompactMultiselect': 'react-compact-multiselect'
  }
});

require(['react', 'ReactCompactMultiselect'], function(React, ReactCompactMultiselect) {

  React.render(React.createElement(ReactCompactMultiselect), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm run dev`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
