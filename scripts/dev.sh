#!/bin/bash
BASEDIR=$(dirname $0)

webpack serve  \
 --mode development \
 --hot \
 --config $BASEDIR/../webpack/webpack.dev.js \
 --env type=website