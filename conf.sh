kubectl create  configmap -n database database-getmodel-set  --from-file=./scripts/AppSet.java
kubectl create  configmap -n database database-getmodel-get  --from-file=./scripts/AppGet.java
kubectl create  configmap -n database database-getmodel-pack  --from-file=./scripts/pack.sh
kubectl create -f  ./manifest/deployment.yaml  -n database

