# poc
POC on Service Pack App

# Setting up node js 
npm init
npm install hapi joi inert ioredis --save

# Start Redis server
$ redis-server

# Start node js
node server.js

# redis client
redis-cli

LRANGE serviceQueue  0 -1
LRANGE 9845532994  0 -1


# Send request to Post uri :
 http://localhost:8080/api/sr


# Payload
{
"customerId": "9845536994",
"serviceDate": "July 2011, 11:30 am", 
"serviceProvider": "Mandovi", 
"productLoc": "12.9227068,77.693106"
}

# Driver Interface
http://localhost:8080

//Deploy to AWS Elastic Beanstalk from eb cli
eb init

eb create poc-dev
eb use poc-dev
eb deploy
