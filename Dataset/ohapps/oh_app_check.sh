#! /bin/sh

URL=$1
PROJECT_NAME=`echo $URL | sed 's@.*/@@'`

git clone $URL

HVIGORFILE_COUNT=`find $PROJECT_NAME -type f | sed 's@.*/@@' | grep hvigorfile.ts | wc -l`

if [ $HVIGORFILE_COUNT -gt 0 ]; then
    echo "$URL is an OpenHarmony app" >> ohapps.txt
fi

rm -rf $PROJECT_NAME