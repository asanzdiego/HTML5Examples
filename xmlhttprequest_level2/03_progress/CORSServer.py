#!/usr/bin/python

import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        print "post"
        content_length = int(self.headers['Content-length'])
        bytes_read = 0
        while bytes_read < content_length:
            x = self.rfile.read(1)
            bytes_read += 1
        print "Read POST data of {} bytes".format(content_length)

        message = "Upload to geodata.example.net complete"

        self.send_response(200)

        self.send_header("Access-Control-Allow-Origin", "http://portal.example.com:9999")
        self.send_header("Content-Length", str(len(message)))
        self.send_header("Content-Type", "text/plain");
        self.end_headers()

        print message
        self.wfile.write(message);

    def do_OPTIONS(self):
        print "options"
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "http://portal.example.com:9999")
        self.send_header("Access-Control-Allow-Methods", "POST")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    BaseHTTPServer.test(CORSRequestHandler, BaseHTTPServer.HTTPServer)

