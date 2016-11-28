#! /usr/bin/env sh
APP_DIR=$(dirname $(dirname $(realpath $0)))/app
electron $APP_DIR/index.js  "$1"
