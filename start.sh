#!/bin/bash
# My first script

echo "Installing dependencies"
npm install --production &> /dev/null
echo "Starting express server on port 3000"
# ENV=production PORT=3000 npm start &> /dev/null
ENV=production PORT=3000 npm start
