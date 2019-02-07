const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');

const Price = (props) => {
    const itemPrice = props.itemData.item.price;
    return (
        <div>
            <Script>
                {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
                    isJSON: true
                })};`}    
            </Script>
            {itemPrice.currency}
            {itemPrice.decimals}
        </div>
    )
};

module.exports = Price;