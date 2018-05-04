# Kubecon EU 2018 talk

I am putting this on-line so that if anyone wants to work with me on this they can.
I will be happy to "add co-authors" and share the stage in Copenhagen

... as long as we talk a bit about [kubeless](https://github.com/kubeless/kubeless) :)

## Schedule

Sched is [here](http://sched.co/Dqvs) with abstract.

## Goal

Show that k8s has all the security objects necessary to secure functions and highlight it using kubeless.

## Thoughts

First go through std k8s objects for security, "who can run the functions and what resources can the function access"

* RBAC
* network policies
* pod security constraints
* limits

Show how kubeless can specify a default deployment template that suits your needs

Then dive deeper into how to get the identity of the Pod

* Show how kube2iam can load a IAM profile into a Pod so that you can connect to AWS services ( highlight sqs, kinesis triggers)
* talk about [SPIRE/SPIFFE](https://spiffe.io/spire/)
* Talk about Istio auth
* Demo kubeless with Istio

Secure function endpoint with things like API gateway and Kong

* TLS Ingress route to function
* Kong JWT
* API gateway registration



