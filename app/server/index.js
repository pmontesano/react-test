require('@babel/register');
require('@babel/polyfill');
require.extensions['.scss'] = () => {};
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const axios = require('axios');
const template = require('./template');
const {getItem, getListingItems} = require('./item-service');
const Home = require('../shared/components/pages/home');
const Search = require('../shared/components/pages/search');
const Vip = require('../shared/components/pages/vip');
const server = express();
const port = 3000;

server.use('/', express.static(__dirname + '/../../build'));

server.get('/', function (req, res) {
  res.send(
      template('home',
       ReactDOMServer.renderToString(React.createElement(Home, {},))
    )
  );
});

server.get('/api/items', (req, res) => {
    getListingItems(req.query.q)
        .then(response => res.json(response))
        .catch(err => res.sendStatus(500, err));
});

server.get('/api/items/:id', (req, res) => {
    getItem(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.sendStatus(500, err));
});
 
server.get('/items', function (req, res) {
    const query = req.query.search;
    const props = {};
    axios
        .get(`http://localhost:3000/api/items`, { params: { q: query } })
        .then((response) => {
            props.items = response.data.items;
            props.breadcrumb = response.data.breadcrumb;
            props.categories = response.data.categories;
            res.send(
                template(
                    'search',
                    ReactDOMServer.renderToString(
                        React.createElement(Search, { ...props } , null)
                    )
                )
            );
            
    })

    .catch(function (error) {
        console.log(error);
    })

  });

  server.get('/items/:id', function (req, res) {
    const itemId = req.params.id;
    const props = {};
    
    axios
    .get(`http://localhost:3000/api/items/${itemId}`)
    .then((response) => { 
        props.itemData = response.data;
        res.send(
            template(
                'vip',
                ReactDOMServer.renderToString(
                    React.createElement(Vip, props, null)
                )
            )
        );
    })
    .catch(e => console.error(e));
  });

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
