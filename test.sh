# !/bin/bash
#   bash test.sh

b=$(ls -td ../* | grep "bootcamp")

for entry in $b
do
  t1=0
  t25=0
  t3=0
  t4=0
  if [ ! -f /tmp/$entry/config.js ]; then
    # echo "File not found!"
    cp Teacherconfig.js config.js
  else
    # echo "File exists"
    cp $entry/config.js .
    t1=$(node test_config.js)
  fi
  cp $entry/ListingSchema.js .
  cp $entry/JSONtoMongo.js .
  cp $entry/queries.js .

  u=$(echo $entry | cut -c 15-)
  # echo $u

  if (( t1 == 0 )); then
    # echo "$u: $t1, test failed"
    cp Teacherconfig.js config.js
  fi

  t25=$(npm test 2>&1 >/dev/null | grep 'pass')
  t25=$(echo $t25 | awk '{print 2*($3 + $8)}')
  # echo $t25 #also test 2?

  e=$(timeout 3s node JSONtoMongo.js 2> /dev/null)
  t3=$(timeout 3s node test_JSONtoMongo.js)
  # echo $t3

  e=$(timeout 3s node JSONtoMongo.js 2>/dev/null)
  e=$(timeout 3s node queries.js 2>/dev/null 1>test_queries.txt)
  t4=$(timeout 3s node test_queries.js 2>/dev/null)
  # echo $t4

  echo $u, $t1, $t25, $t3, $t4, $t25 >> output5.txt

  rm ./config.js
  rm ./ListingSchema.js
  rm ./JSONtoMongo.js
  rm ./queries.js
  rm ./test_queries.txt

done
