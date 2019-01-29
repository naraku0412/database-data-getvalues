#!/bin/sh

cd /project

mvn clean 
mvn package

while true
do 
   sleep 60
done
