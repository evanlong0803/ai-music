#!/usr/bin/env bash

node scripts/tsToJs.js

echo 'convert successfully'

rsync -av src/assets js/src
rm -rf src
mv js/src src

git branch -D js
git checkout -b js
git add .
