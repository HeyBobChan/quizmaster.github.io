import http.server
import socketserver

# Define the port you want to use
PORT = 8000

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

# Create an object of the handler class
handler_object = MyHttpRequestHandler

# Define the server and bind it to the port
with socketserver.TCPServer(("", PORT), handler_object) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
