#!/bin/bash


export ETCDCTL_API=3

etcdctl put product_weizen "$(cat weizen.json)"
etcdctl put product_ale "$(cat ale.json)"
etcdctl put product_stark "$(cat stark.json)"
