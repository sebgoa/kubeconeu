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
kubectl apply -f install/kubernetes/istio-auth.yaml
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
cd ..
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
kubectl apply -f etcd.yaml
cd data
export ETCDCTL_ENDPOINTS=$(minikube service etcd --url -n default)
./deploy.sh
cd ..
```



Install Beershop:
```
# docker tag $(docker build -q -t beershop .) joekhybris/beershop:kubecon && docker push joekhybris/beershop:kubecon
kubectl apply -f shop.yml
```

Run Proxy:
```
sudo go run proxy.go $(minikube service istio-ingress --url -n istio-system)
```








# Demo

Install functions:
```
cd functions
./deploy.sh
cd ..
```

Patch:
```
          exec:
            command:
            - curl
            - -f
            - http://localhost:8080/healthz
```

Deploy Ingress:
```
kubectl apply -f shop-ing.yml
```

Deploy JWT Rule:
```
kubectl apply -f shop-jwt.yml
```

Fetch token:
```
python sa-jwt.py gce-key.json -iss beershop@istio-test-202708.iam.gserviceaccount.com -sub joek
```

Setup RBAC
```
kubectl apply -f rbac-enable.yaml
```

Default (with and without etcd):
```
kubectl apply -f rbac-default.yaml
```

Comments:
```
kubectl apply -f rbac-comments.yaml
```
