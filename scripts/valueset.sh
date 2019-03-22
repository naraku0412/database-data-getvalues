#!/bin/sh

while getopts ":k:v:" opt
do
    case $opt in
        k)
            key=$OPTARG
            ;;
        v)
            value=$OPTARG
            ;;
    esac
done

java -cp /workspace/project.jar com.app.AppSet -k $key -v $value

#exit 0
