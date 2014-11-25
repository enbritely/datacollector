import time, BaseHTTPServer, base64, sys, logging, ast, json
from urlparse import urlparse, parse_qs
from os import curdir

logging.basicConfig(level=logging.DEBUG, stream=sys.stdout)

HOST_NAME = '127.0.0.1'
PORT_NUMBER = 6042
response_list = []

def build_response_list(response):
    global response_list
    resp_dict = ast.literal_eval(response)
    if resp_dict['type'] == 'ready':
            response_list = []
    response_list.append(response)

class TestServer(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        """Respond to a GET request."""
        if self.path == "/getdata":
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            for i in range(len(response_list)):
                self.wfile.write(response_list[i])
            return

        if self.path == "/list.html":
            f = open("list.html")
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(f.read())
            f.close()
            return

        params = parse_qs(urlparse(self.path).query)

        if 'data' not in params:
            return self.send_response(400)

        response = base64.b64decode(params['data'][0])
        build_response_list(response)
        print response

    if '-s' in sys.argv or '--silent' in sys.argv:
        def log_message(self, format, *args):
            pass



if __name__ == '__main__':
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), TestServer)
    if '-s' not in sys.argv and '--silent' not in sys.argv:
        print time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    if '-s' not in sys.argv and '--silent' not in sys.argv:
        print time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER)