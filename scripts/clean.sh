
DIRNAME=$(dirname $0)
cd $DIRNAME/..
rm -rfv $(pwd)/app/resources
node $DIRNAME/rmexts.js $(pwd) exe log
