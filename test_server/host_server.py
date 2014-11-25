import time, SimpleHTTPServer, sys, SocketServer

HOST_NAME = '127.0.0.1'
PORT_NUMBER = 80

LIVE_PATH = ["/eoptika/en.js","/jatek/en.js"] #append with rackcdn.com/ paths

class TestServer(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Respond to a GET request."""
        if self.path in LIVE_PATH:
            self.path = "/client/dist/en.js"
        f = self.send_head()
        if f:
            try:
                self.copyfile(f, self.wfile)
            finally:
                f.close()


if __name__ == '__main__':

    server_class = SocketServer.TCPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), TestServer)
    print time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER)