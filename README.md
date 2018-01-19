# Datacollector
Client side data collecting script.

## Install
Build it with `grunt`.
Deployment: `grunt deploy`

## Testing

### Prerequisits
1. Gerbil is tested manually at the moment with a local webserver. Any webserver serving that can serve static HTML files and listen on 2 ports will do the job. The webserver have to listen on two ports to simulate cross-domain iframes: the standard 80 and 8880 for the iframes.
2. Set the root of the local webserver in `package.json` `"test_home"` key. 
3. The directory `gerbil/test` holds some test pages, that are automatically copied to the root directory set in `package.json`. One can test with browserstack if remote connections are enabled to the webserver. 
4. Test gerbil with `grunt test`. Open a webbrowser and see the magic.

### Make a distribution
If You have a new version of gerbil created You should make a distributable copy of it. This is basicly a copy of the minified version of the collector to an S3 bucket. The following command will do a distribution, please check to bump the version name, because it will overwrite existing versions of the code on S3.

```
grunt dist
```

## Deployment

### Deploy collector to a client
Only a packaged collector can be deployed to a client to our CDN. You can achive this via the following command:

```
grunt deply --gv=[gerbil-version] --wsid=[the wsid]
```

where [gerbil-version] needs to be substituted with a valid version number and a wsid that needs to be also valid, meaning we have a collector endpoint (dc-[wsid].enbrite.ly) set up and a client S3 bucket also set up (s3://enbritely-client-[wsid]). You can look for the version number with `aws s3 cp s3://enbritely-artifacts/gerbil/releases/`

### Setting up collector endpoints

On AWS Console get to Route 53 and open the enbrite.ly. hosted zone. Here we have a bunch of datacollector endpoints prefixed with dc-. To create a new endpoint create a DNS A record that is an alias and the alias target should be one elb depending on the integration:
- for standard display integration use display-tracker ELB
- for mobile only mobile-tracker ELB
- for page integration use page-tracker ELB
- for pixel integration like video and others use pixel-tracker as ELB

### Setting up S3 bucket

Go to S3. Create a bucket with the name and copy an existing bucket permissions from one of the enbritely-client-... buckets.

# Versions

## Current stable

### gerbil-2.4.7 (master branch)
- viewability, performance and all the good stuff, this is the way to go with integrations

## Legacy versions

### gerbil-3.0.0 (To be tested on gcpm)
Major revision. 
- IAB viewability enabled. Use adboxid parameter to tell gerbil what the id of the adbox is. If multiple impressions might be on the same page use adboxclass. If no adboxid and adbox class is given a standard inpage data collection will commence.
- Logging performance metrics on iframe loading.
- Pinging 1, 5, 10, 30, 60, 120, and 300 secs after last activity.

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

