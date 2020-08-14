#!/bin/bash


./startFabric.sh javascript
cd javascript
npm install
node enrollAdmin.js
node registerUser.js 
node query.js