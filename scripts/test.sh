
DIRNAME=$(dirname $0)
PROJECT_DIR=$(dirname $DIRNAME)
APP_DIR=$PROJECT_DIR/app

$DIRNAME/build.sh && electron $APP_DIR/index.js  $PROJECT_DIR/test/test.swf
