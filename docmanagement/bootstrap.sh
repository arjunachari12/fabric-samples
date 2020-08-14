#!/bin/bash


./startFabric.sh javascript
cd javascript
nvm use 10.10.0
npm install
node enrollAdmin.js
node registerUser.js 
node query.js