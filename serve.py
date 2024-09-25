from livereload import Server
import os

# Set the root directory of your site
site_root = os.path.abspath('.')

# Initialize the server
server = Server()

# Watch for changes in HTML, CSS, and JS files
server.watch('*.html')
server.watch('*.css')
server.watch('*.js')
server.watch('**/*.html')
server.watch('**/*.css')
server.watch('**/*.js')

# Start the server
server.serve(root=site_root, port=5500, host='0.0.0.0')
