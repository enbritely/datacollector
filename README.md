# Datacollector
Client side data collecting script.

## Install
Build it with `grunt`.
Deployment: `grunt deploy`

## Gerbil Assembler
The gerbil-assembler is a standalon utility to assemble the datacollector for the clients.

## Versions
### gerbil-2.1.6 (Latest stable)
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

