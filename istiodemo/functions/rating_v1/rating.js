'use strict';

const { Etcd3 } = require('etcd3');
const util = require('util');
const client = new Etcd3({hosts: process.env.ETCD_HOSTS});

module.exports = {
  getRating: async function (event, context) {
    const product = event.extensions.request.originalUrl.replace(/^\/rating\//, "");
    const comments = "comment_" + product
    console.log(comments)
    const data = await client.getAll().prefix(comments).json()
    console.log(data)
    if(data == null){
      return "-"
    } else {
      var i = 0;
      Object.keys(data).forEach(function(key){
        i += data[key].rating
        console.log(`Rating: ${data[key].rating} Sum: ${i}`)
      });
      var rating = Math.round((i / Object.keys(data).length))
      return `Rating: ${rating}`
    }
  }
}

