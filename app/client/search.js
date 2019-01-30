const React = require('react');
const ReactDOM = require ('react-dom');
const Search = require('../shared/components/pages/search');

const preloadedState = window.ML_PRELOADED_STATE;

ReactDOM.hydrate (<Search { ...preloadedState } />, document.getElementById('root'));
