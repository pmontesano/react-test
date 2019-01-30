const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');

const Vip = (props) => {
    //const { itemData, children } = props;
    const itemData = props.itemData
    const children = props.children
    const serializeProps = { itemData: props.itemData };
    const item = props.itemData.item;
    console.log(props);
    return(
    <div>
        <Script>
            {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
                isJSON: true
            })};`}
        </Script>
        {item && (
            <div>
                <h2>{item.title}</h2>
                <img src={item.picture} />
                <p>
                    {item.price.amount}
                    <sup>{item.price.decimals}</sup>
                </p>
            </div>
        )}
    </div>)
}

module.exports = Vip;