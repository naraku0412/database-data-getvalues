kubectl delete  configmap -n database database-getmodel-set 
kubectl delete  configmap -n database database-getmodel-get
kubectl delete  configmap -n database database-getmodel-pack
kubectl delete -f  ./manifest/deployment.yaml  -n database

