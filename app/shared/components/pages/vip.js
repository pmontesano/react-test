const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');
const Layout = require('../commons/layout');
const SvgChevron = require('./svg-chevron');
require('./vip.scss');

const Vip = (props) => {
    //const { itemData, children } = props;
    // const itemData = props.itemData
    // const children = props.children
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
        <Layout />
        {item && (
            <div className="vip-container"> 

                <ul class="breadcrumb">
                    {item.breadcrumb.map(cat =>
                        <li>{cat.name} <SvgChevron /> </li>    
                    )}
                </ul>

                <div className="vip-container-inner">
                    
                    <div className="vip-col-left">
                        <div className="vip-image"><img src={item.picture} /></div>
                        <div className="vip-description">
                            <h2 class="vip-description__title">Descripción</h2>
                            {item.description}
                        </div>
                    </div>

                    <div className="vip-col-right">
                        <p class="vip-item-condition">{item.condition === 'new' ? 'Nuevo' : 'Usado'} - {item.sold_quantity} vendidos</p>                
                        <h2 className="vip-item-title">{item.title}</h2> 
                        <div class="price">
                            <span>{item.price.currency}</span>
                            <span>{item.price.amount}</span>
                            {item.price.decimals > 0 && 
                                <sup>{item.price.decimals}</sup>                   
                            }
                        </div>                       
                    </div>       
                                   
                    
                    
                </div>
                
            </div>
        )}
    </div>)
}

module.exports = Vip;