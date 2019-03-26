kubectl create  configmap -n database database-getvalue-set  --from-file=./scripts/AppSet.java
kubectl create  configmap -n database database-getvalue-get  --from-file=./scripts/AppGet.java
kubectl create  configmap -n database database-getvalue-pack  --from-file=./scripts/pack.sh
kubectl create  configmap -n database database-getvalue-server  --from-file=./scripts/server.js
kubectl create  configmap -n database database-getvalue-valueget  --from-file=./scripts/valueget.sh
kubectl create  configmap -n database database-getvalue-valueset  --from-file=./scripts/valueset.sh
docker build -t gmt.reg.me/frame/maven-getvalues  -f ./Dockerfiles/dockerfile.maven .
docker push gmt.reg.me/frame/maven-getvalues
docker build -t gmt.reg.me/frame/jn-getvalues -f ./Dockerfiles/dockerfile.jdk-node .
docker push gmt.reg.me/frame/jn-getvalues
ansible node -m shell -a "docker pull gmt.reg.me/frame/maven-getvalues"
ansible node -m shell -a "docker pull gmt.reg.me/frame/jn-getvalues"
kubectl create -f  ./manifest/deployment.yaml  -n database
#kubectl create -f  ./manifest/service.yaml  -n database
