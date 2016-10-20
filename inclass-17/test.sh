#!/bin/bash
PORT=3000

echo "GET /headlines/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/xl68
echo ""

echo "PUT /headline"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"xl68\", \"headline\":\"This is my new headline!\" }" http://localhost:${PORT}/headline 
echo ""

echo "GET /headlines/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/xl68
echo ""

echo "GET /email/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/xl68
echo ""

echo "PUT /email"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"xl68\", \"email\":\"xiang.li@rice.edu\" }" http://localhost:${PORT}/email 
echo ""

echo "GET /email/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/xl68
echo ""


echo "GET /zipcode/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/xl68
echo ""

echo "PUT /zipcode"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"xl68\", \"zipcode\":\"77030\" }" http://localhost:${PORT}/zipcode 
echo ""

echo "GET /zipcode/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/xl68
echo ""


echo "GET /avatars/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/xl68
echo ""

echo "PUT /avatar"
curl -X PUT -H 'Content-Type: application/json' -d "{ \"username\":\"xl68\", \"avatar\":\"dmc.rice.edu\" }" http://localhost:${PORT}/avatar 
echo ""

echo "GET /avatars/xl68"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/xl68
echo ""

