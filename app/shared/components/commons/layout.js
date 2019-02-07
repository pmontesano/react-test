const React = require('react');
const SvgSearch = require('./svg-search');
require('./layout.scss');

class Layout extends React.Component {

    constructor() {
        super();
        this.state = { searchTerm: '' }
    }

    handleSearchTermChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        
        return (
            <div>                
                <header className="nav-header">
                    <div className="nav-bounds">                    
                        <a className="nav-logo" href="#" tabindex="1">Mercado Libre Argentina - Donde comprar y vender de todo</a>
                        <form className="nav-search" action="/items" method="get">
                            <input 
                                onChange={this.handleSearchTermChange.bind(this)}
                                className="search-bar" 
                                placeholder="Buscar productos, marcas y más..." 
                            />
                            <input type="hidden" value={this.state.searchTerm} name="search" />
                            <button className="search-button" type="submit">                                
                                <i className="search-button-icon">
                                    <SvgSearch />
                                </i>
                            </button>
                        </form>
                    </div>
                </header>
            </div>
        )

    }

}

module.exports = Layout;