
```
kubeless function deploy foo --from-file foo.py --runtime python2.7 --handler foo.handler --label foo=bar
kubeless function deploy foonet --from-file foo-net.py --runtime python2.7 --handler foo-net.handler --label foo=net --dependencies requirements.txt
```


```
curl -XPOST -H "Content-Type: application/json" -d '{"hey":"kubecon"}' http://foo:8080
```
