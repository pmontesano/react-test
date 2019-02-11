const axios = require('axios');

const getDecimalsFromPrice = amount =>
  amount % 1 !== 0 ? parseInt(amount.toString().split('.')[1]) : 0;

// listing items
const getListingItems = async query => {

    try {
        
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search`, {params: {q: query, limit: 4}});
        const breadcrumbResponse = await axios.get(
            `https://api.mercadolibre.com/categories/${response.data.results[0].category_id}`
          );

        const items = [];
        response.data.results.forEach((item) => {
            
            const currentItem = {
                id: item.id,
                title: item.title,                
                price: {
                    currency: item.currency_id ? '$' : '',
                    amount: item.price,
                    decimals: getDecimalsFromPrice(item.price),
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
            }

            items.push(currentItem);
        });

        const listingDto = {
            author: { name: "Pablo", lastname: "Montesano"},
            items,
            breadcrumb: breadcrumbResponse.data.path_from_root,
            categories: breadcrumbResponse.data.name,            
        };

        return listingDto;
                
    } catch (e) {
        console.error(e);
    }
}
  
// vip item
const getItem = async id => {
    try {
      const response = await axios.get(`http://api.mercadolibre.com/items/${id}`);
      const descriptionResponse = await axios.get(
        `http://api.mercadolibre.com/items/${id}/description`
      );
      const breadcrumbResponse = await axios.get(
        `https://api.mercadolibre.com/categories/${response.data.category_id}`
      );
  
      const itemDto = {
        author: { name: 'Pablo', lastname: 'Montesano' },
        item: {
          id: response.data.id,
          title: response.data.title,
          original_price: response.data.original_price,
          price: {
            currency: response.data.currency_id ? '$' : '',
            amount: Math.trunc(response.data.price),
            decimals: getDecimalsFromPrice(response.data.price)
          },
            picture: response.data.pictures[0].secure_url,
            condition: response.data.condition,
            free_shipping: response.data.shipping.free_shipping,
            sold_quantity: response.data.sold_quantity,
            description: descriptionResponse
            ? descriptionResponse.data.plain_text
            : '',
            breadcrumb: breadcrumbResponse.data.path_from_root
        }
      };
      return itemDto;
    } catch (e) {
      console.error(e);
    }
  };


  module.exports = {getItem, getListingItems}