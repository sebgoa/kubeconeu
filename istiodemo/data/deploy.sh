#!/bin/bash


export ETCDCTL_API=3

for var in `ls -1 | grep json`
do 
   kubectl exec -c etcd -it $(kubectl get pods -lapp=etcd --no-headers=true -o custom-columns=:metadata.name) -- /usr/local/bin/etcdctl put $(echo $var | sed 's/.json//') "$(cat $var)"
done