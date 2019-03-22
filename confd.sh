kubectl delete  configmap -n database database-getvalue-set 
kubectl delete  configmap -n database database-getvalue-get
kubectl delete  configmap -n database database-getvalue-pack
kubectl delete  configmap -n database database-getvalue-server
kubectl delete  configmap -n database database-getvalue-valueset
kubectl delete  configmap -n database database-getvalue-valueget
kubectl delete -f  ./manifest/deployment.yaml  -n database
#kubectl delete -f  ./manifest/service.yaml  -n database

