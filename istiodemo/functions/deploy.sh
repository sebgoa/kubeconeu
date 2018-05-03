#!/bin/bash

source ./source_me.sh


./bin/kubeless function delete product-service
./bin/kubeless function delete comments
# ./bin/kubeless function delete rating-v1
# ./bin/kubeless function delete rating-v2

sleep 2

./bin/kubeless function deploy product-service --label version=v1 --runtime nodejs8 --from-file product/product.js --handler product.getProducts --dependencies product/package.json --env ETCD_HOSTS=etcd-client.default:2379



./bin/kubeless function deploy comments --label version=v1 --runtime nodejs8 --from-file comment_v1/comment.js --handler comment.getComments --dependencies comment_v1/package.json --env ETCD_HOSTS=etcd-client:2379



# ./bin/kubeless function deploy rating-v1 --label version=v1,app=rating --runtime nodejs8 --from-file rating_v1/rating.js --handler rating.getRating --dependencies rating_v1/package.json --env ETCD_HOSTS=etcd-client:2379


# ./bin/kubeless function deploy rating-v2 --label version=v2,app=rating --runtime nodejs8 --from-file rating_v2/rating.js --handler rating.getRating --dependencies rating_v2/package.json --env ETCD_HOSTS=etcd-client:2379
