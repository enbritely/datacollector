host_server.py
	
	1. 	In the config file set the baseUri to http://127.0.0.1:6042
		Build your en.js file (grunt watch --config="required site" --jq=lib/jquery.js)
		
		1a. In case of live site testing:
			a, insert 127.0.0.1 "rackcdn url" to your host file
			b, append LIVE_PATH variable if needed in the source with the path where the en.js file located on rackcdn.com
		
	2. Start the server: python host_server.py
	
	3.	Open the site you want to test
		3a. Live test: Open the site you want to test	
		3b. Static test: Navigate to the required html from http://127.0.0.1
		
test_server.py
	
	The test server receives, decodes and echos the data parameter to the console.
	
	1. Start the server: python test_server.py (optional parameters: --silent, -s)
	2. You can check the data flow from the last ready type event at http://127.0.0.1:6042/list.html