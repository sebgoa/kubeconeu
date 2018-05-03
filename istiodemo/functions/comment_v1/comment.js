'use strict';

const { Etcd3 } = require('etcd3');
const util = require('util');
const client = new Etcd3({hosts: process.env.ETCD_HOSTS});

module.exports = {
  getComments: async function (event, context) {
    const product = event.extensions.request.originalUrl.replace(/^\/comments\//, "");
    const comments = "comment_" + product
    console.log(comments)
    const data = await client.getAll().prefix(comments).json()
    console.log(data)
    if(data == null){
      return [] 
    } else {
      const b = []
      Object.keys(data).forEach(function(key){
        b.push(data[key])
      });
      return b
    }
  }
}

