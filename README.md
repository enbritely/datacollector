# Datacollector
Client side data collector script.

## Installation
1. Clone git repo. 
2. cd datacollector/gerbil
3. npm install (install dependenicies)

## Build 
Build it with `grunt`.

## Testing

### Prerequisits
1. Gerbil is tested manually at the moment with a local webserver. Any webserver serving that can serve static HTML files and listen on 2 ports will do the job. The webserver have to listen on two ports to simulate cross-domain iframes: the standard 80 and 8880 for the iframes.
2. Set the root of the local webserver in `package.json` `"test_home"` key. 
3. The directory `gerbil/test` holds some test pages, that are automatically copied to the root directory set in `package.json`. One can test with browserstack if remote connections are enabled to the webserver. 
4. Test gerbil with `grunt test`. Open a webbrowser and see the magic.

## Deploy
TBD

## Versions

### gerbil-2.1.7 (Latest stable)
Removed support for HTTP protocol. Now sending data over HTTPS ONLY.

### gerbil-2.1.7.1
Removed support for HTTP protocol. Now sending data over HTTPS ONLY. Same as 2.1.7, but has no cookie support.

### gerbil-2.1.6
Developed in connection with sitebar measureablity for Fastbrdige. (sitebar branch)
Features 
- Uses "use strict" declaration in head for optimization
- Uses COOKIES for session identification
- Mousemovement segmentation in 10x10 grid
- Grunt build includes package version
- Redirecter enabled
- Custom macro passing in ready event. Use _ as first character of macro name in script tag to pass the macro (eg. _mymacro=[%MYADSERVERMACRO%])
- Will fetch links from the surroundings if gerbil runs in an iframe (ALWAYS).

### gerbil-2.1.6.1 
Deveolped in connection with a request, that no cookie string is allowed in the tag. So we ripped it out.
All the same as 2.1.6

### gerbil-2.1.3.1 (panic branch)
Legacy cookie disabled collector. Do not send to client next time, use gerbil-2.1.6.1 instead.

### gerbil-2.0.1
Legacy collector

### ferret-2.2.2
Developed in connection with teamred request for IAB viewability measurements. Some improvements could be implemented in gerbil-2.1.6.(Size reduction)

