# poc
POC on Service Pack App

# Setting up node js 
npm init
npm install hapi joi inert ioredis --save

# Start node js
node server.js

# Send request to Post uri :
 http://localhost:8080/api/sr


# Payload
{
“customerId": “9845532994”,
“serviceDate": “July 2011, 11:30 am”, 
“serviceProvider": "Mandovi”, 
“productLoc”: “12.9227068,77.693106"
}