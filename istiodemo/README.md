# Setup

Setup minikube 

```
minikube start --vm-driver=hyperkit    --extra-config=controller-manager.ClusterSigningCertFile="/var/lib/localkube/certs/ca.crt"     --extra-config=controller-manager.ClusterSigningKeyFile="/var/lib/localkube/certs/ca.key"     --extra-config=apiserver.Admission.PluginNames=NamespaceLifecycle,LimitRanger,ServiceAccount,PersistentVolumeLabel,DefaultStorageClass,DefaultTolerationSeconds,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota     --kubernetes-version=v1.9.0
```

Get Istio:
```
curl -L https://git.io/getLatestIstio | sh -
```

Install istio with auth enabled:
```
cd istio-0.7.1
kubectl apply -f install/kubernetes/istio.yaml
```

Install sidecar injector:
```
./install/kubernetes/webhook-create-signed-cert.sh \
    --service istio-sidecar-injector \
    --namespace istio-system \
    --secret sidecar-injector-certs
kubectl apply -f install/kubernetes/istio-sidecar-injector-configmap-release.yaml
cat install/kubernetes/istio-sidecar-injector.yaml | \
     ./install/kubernetes/webhook-patch-ca-bundle.sh > \
     install/kubernetes/istio-sidecar-injector-with-ca-bundle.yaml
kubectl apply -f install/kubernetes/istio-sidecar-injector-with-ca-bundle.yaml
```

Validate if injector is running:
```
kubectl -n istio-system get deployment -listio=sidecar-injector
```

Enable injection for default namespace:
```
kubectl label namespace default istio-injection=enabled
```

Install kubeless:
```
kubectl create ns kubeless
kubectl create -f kubeless-non-rbac-v0.6.0.yaml 
```

Install etcd:
``` 
cd ..
kubectl apply -f etcd.yaml
cd data
export ETCDCTL_ENDPOINTS=$(minikube service etcd --url -n default)
./deploy.sh
```

Install functions:


curl -H 'Host: product-service.beershop.local' -v http://192.168.64.100:30233


https://github.com/istio/api/blob/master/authentication/v1alpha1/policy.proto
https://github.com/istio/api/blob/master/mixer/v1/config/client/auth.proto