#!/bin/bash

source ./source_me.sh




./bin/kubeless function delete product-service
./bin/kubeless function deploy product-service --runtime nodejs8 --from-file product/product.js --handler product.getProducts --dependencies product/package.json --env ETCD_HOSTS=etcd-client:2379



