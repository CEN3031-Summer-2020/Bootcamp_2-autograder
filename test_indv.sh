# !/bin/bash
#   bash test_indv.sh

# t1=$(node test_config.js)
t1=10
t25=$(npm test 2>&1 >/dev/null | grep 'pass')
t25=$(echo $t25 | awk '{print 2*($3 + $8)}')
# echo $t25 #also test 2 and 5?

e=$(timeout 3s node JSONtoMongo.js 2> /dev/null)
t3=$(timeout 3s node test_JSONtoMongo.js)
# echo $t3

e=$(timeout 3s node JSONtoMongo.js 2>/dev/null)
e=$(timeout 3s node queries.js 2>/dev/null 1>test_queries.txt)
t4=$(timeout 3s node test_queries.js 2>/dev/null)
# echo $t4

echo $t1, $t25, $t3, $t4, $t25
# echo $u, $t1, $t25, $t3, $t4, $t25 >> output5.txt
