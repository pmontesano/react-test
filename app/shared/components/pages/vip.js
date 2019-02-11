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
    const price = item.price.amount;
    const originalPrice = item.original_price; 
    const decreasePrice = originalPrice - price;       
    const priceDiscount = Math.trunc((decreasePrice / originalPrice) * 100);

    function getDiscount (oldPrice, newPrice) {
        
        const decreaseValue = oldPrice - newPrice;

        return  Math.trunc((decreaseValue / oldPrice) * 100);        
    }

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

                <ul className="breadcrumb">
                    {item.breadcrumb.map(cat =>
                        <li>{cat.name} <SvgChevron /> </li>    
                    )}
                </ul>

                <div className="vip-container-inner">
                    
                    <div className="vip-col-left">
                        <div className="vip-image"><img src={item.picture} /></div>
                        <div className="vip-description">
                            <h2 className="vip-description__title">Descripción</h2>
                            {item.description}
                        </div>
                    </div>

                    <div className="vip-col-right">
                        <p className="vip-item-condition">{item.condition === 'new' ? 'Nuevo' : 'Usado'} - {item.sold_quantity} vendidos</p>                
                        <h2 className="vip-item-title">{item.title}</h2> 
                        {item.original_price && (  
                            <p className="vip-original-price">{item.original_price}</p>
                        )}
                        <div className="vip-price">
                            <span className="vip-price-currency">{item.price.currency}</span>
                            <span className="vip-price-amount">{item.price.amount}</span>
                            {item.price.decimals > 0 && 
                                <sup className="vip-price-decimals">{item.price.decimals}</sup>                   
                            }
                        </div>

                        

                        {item.original_price && (                        
                            // <p class="vip-price-discount">{getDiscount(item.original_price, item.price.amount)}% OFF</p>
                            <p class="vip-price-discount">{priceDiscount}% OFF</p> 
                        )}

                        <button value="Comprar" className="vip-button">Comprar</button>                     
                    </div>                    
                </div>
                
            </div>
        )}
    </div>)
}

module.exports = Vip;