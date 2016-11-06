#!/bin/bash
echo "starting http server on port 9999" &
http-server -p 9999 -a portal.example.com -o
