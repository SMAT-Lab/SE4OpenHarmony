#! /bin/sh

FILE="../ossprojects_gitee.txt"

for line in `cat $FILE`;
do
    line=`echo $line | tr -d '\r'`
    AUTHOR=`echo $line | sed 's@__.*@@'`
    PROJECT_NAME=`echo $line | sed 's@.*__@@'`

    URL=https://gitee.com/$AUTHOR/$PROJECT_NAME

    echo $URL

    ./oh_app_check.sh $URL
done