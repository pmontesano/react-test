const React = require("react");
const serialize = require("serialize-javascript");
const PropTypes = require("prop-types");
const Script = require("../helpers/script");
const Layout = require("../commons/layout");

require("./search.scss");

const Search = props => {
    const { items, breadcrumb, categories } = props;
    const serializeProps = { items, breadcrumb, categories };
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true
        })};`}
      </Script>
      <Layout />

      <div className="search-container">
        <aside className="filters">
          <ul className="breadcrumb">
            {breadcrumb.map(cat => (
              <li>{cat.name} ></li>
            ))}
          </ul>
          <h2 className="breadcrumb-title">
            {categories}
          </h2>
        </aside>
        <div className="search-list-container">
          {items &&
            items.map(item => (
              <div key={item.id} className="item-list">
                <a href={`/items/${item.id}`}>
                  <figure className="item-list-img">
                    <img alt={item.title} src={item.picture} />
                  </figure>                  
                </a>
                <div className="item-information">
                  <a href={`/items/${item.id}`}>
                    <h2 className="item-title">{item.title}</h2>
                  </a> 
                  <div className="item-price">
                    <span className="item-price_symbol">{item.price.currency}</span>
                    <span className="item-price_amount">{item.price.amount}</span>
                    {item.price.decimals > 0 && (
                      <sup className="item-price_decimals">{item.price.decimals}</sup>
                    )}
                  </div>
                  {item.free_shipping && <span className="item-fs">Envío gratis</span>}
                  <p className="item-condition">{item.sold_quantity} vendidos</p>
                </div>
                
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ),
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

Search.defaultProps = {
  breadcrumb: null
};

module.exports = Search;