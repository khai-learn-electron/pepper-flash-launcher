
cd $(dirname $0)
DIRNAME=$(pwd)
PROJECT_DIR=$(dirname $DIRNAME)
export IMAGE_SOURCE=$PROJECT_DIR/images
export IMAGE_TARGET=$PROJECT_DIR/app/resources
electron $DIRNAME/mkimg/index.js
