'use strict';

const { Etcd3 } = require('etcd3');
const util = require('util');
const client = new Etcd3({hosts: process.env.ETCD_HOSTS});

module.exports = {
  getProducts: async function (event, context) {
    const id = event.extensions.request.originalUrl.replace(/^\/products\//, "");
    console.log(id)
    if (id == ""){
      console.log("all")
      const data = await client.getAll().prefix("product_").json()
      if(data == null){
        return {}
      } else {
        const b = {}
        Object.keys(data).forEach(function(key){
          b[key.replace(/^product_/, "")] = data[key]
        });
        return b
      }
    } else {
      console.log(id)
      const productId = "product_" + id
      const data = await client.get(productId).json()
      if(data == null){
        return {}
      } else {
        return data
      }
    }
  }
}




// const rq = require('request-promise-native');

// module.exports = {
//     weather: async function (event, context) {
//         const location = event.data.location;

//         if (!location) {
//             throw new Error('You must provide a location.');
//         }
//         const response = await rq(`https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u="c"&format=json`);
//         const condition = JSON.parse(response).query.results.channel.item.condition;
//         const text = condition.text;
//         const temperature = condition.temp;
//         return `It is ${temperature} celsius degrees in ${location} and ${text}`;
//     }
// }