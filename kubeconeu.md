#  Securing Serverless Functions via Kubernetes Objects

JUST BOILERPLATE RIGHT NOW

* Sebastien Goasguen @sebgoa
* kompose, Cabin, kmachine, LF certification course ...
* Now at Bitnami (Charts, monocular, kubeapps, kubecfg, sealed-secrets)
* Apps, Apps, Apps...on any platform

---

## kubeless

* [kubeless.io](http://kubeless.io)
* [https://github.com/kubeless/kubeless](https://github.com/kubeless/kubeless)

Open Source , non-affiliated

* [https://github.com/kubeless](https://github.com/kubeless)

![kubeless](kubeless.png)

---

## kubeless

* Kubernetes extension
* CRD for `functions`
* A controller (acutally several)
* Creates deployments, services
* Creates Ingress if needed
* Uses Configmap, Init container for now
* Instrumented runtimes with `prometheus-client`
* A cute UI
* A `serverless` Plugin
* Custom metrics HPA

---

## What type of Apps

* Event based distributed apps
* Composed of many different services triggered by events

* AWS Lambda Clone
* Google Cloud functions like CLI
* Same realm as OpenWhisk, Fission ...

---

## Serverless

![sls](sls.png)

Today in Serverless 1.20 we now have kubeless support:

20k stars, the _go to_ framework to deploy/managed serverless functions on lambda, Azure, GCF, OpenWhisk.

`sls create --template kubeless-python --path mypythonfunction`

`sls create --template kubeless-nodejs --path mynodefunction`

* [https://serverless.com](https://serverless.com)

---

## Demo

and thanks, 

- @sebgoa