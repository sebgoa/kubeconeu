const express = require('express')
const app = express()
const product = require('./product');
var bodyParser = require('body-parser')


app.use(bodyParser.json())

app.get('/*', product.getProducts)

app.listen(3001, () => console.log('Example app listening on port 3001!'))
