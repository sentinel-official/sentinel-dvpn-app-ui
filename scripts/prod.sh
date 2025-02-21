#!/bin/bash
BASEDIR=$(dirname $0)

webpack  \
 --mode production \
 --config $BASEDIR/../webpack/webpack.prod.js \
 --env type=website 