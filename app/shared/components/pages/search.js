const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');
const Layout = require('../commons/layout');

const Search = (props) => {
    const { items } = props;
    const serializeProps = { items }
    console.log('lista de items', props);
    return(
        <div>
            <Script>
                {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
                    isJSON: true
                })};`}
            </Script>
            <Layout />
            
            {items && items.map(item => (
                <h4 key={item.id}>
                <a href={`/items/${item.id}`}>{item.title}</a>
                </h4>
            ))}
        </div>
    );
};

module.exports = Search;