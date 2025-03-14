module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('secret.json'),
        clean: ['dist'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/*.js'],
                    dest: 'dist'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/*.js'],
                    dest: '<%= pkg.test_home %>'
                },{
                    expand: true,
                    flatten: true,
                    src: ['test/*'],
                    dest: '<%= pkg.test_home %>'
                }]
            }
        },
        rename: {
            js_gz: {
                src: 'dist/gerbil.js.gz',
                dest: 'dist/gerbil-<%= pkg.version %>.js.gz'
            },
            js: {
                src: 'dist/gerbil.js',
                dest: 'dist/gerbil-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                report: 'min',
                squeeze: {
                    dead_code: true,
                },
                mangle: true,
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['dist/*.js']
                }],
            },
        },
        jshint: {
            files: ['src/*.js', '.jshintrc'],
            options: {
                reporter: require('jshint-stylish'),
                reporterOutput: "",
                force: true,
                jshintrc: true,
                curly: true,
                es3: true,
                maxstatements: 5,
            }

        },
        removelogging: {
            dist: {
                src: "dist/*.js"
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip',
                    pretty: true
                },
                expand: true,
                ext: '.js.gz',
                cwd: '.',
                src: ['dist/*.js']
            }
        },
        jsbeautifier: {
            files: ["src/*.js"],
            options: {}
        },
        replace: {
          main: {
            options: {
              patterns: [
                {
                  match: 'PACKAGEVERSION',
                  replacement: '<%= pkg.version %>'
                },
                {
                  match: 'HELPER_IFRAME_URL',
                  replacement: '<%= pkg.helper_iframe_main_url %>'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['src/*.js'], dest: 'dist'}
            ]
          },
          test: {
            options: {
              patterns: [
                {
                  match: 'PACKAGEVERSION',
                  replacement: '<%= pkg.version %>'
                },
                {
                  match: 'HELPER_IFRAME_URL',
                  replacement: '<%= pkg.helper_iframe_test_url %>'
                },
                {
                  match: 'AD_IFRAME_URL',
                  replacement: '<%= pkg.ad_iframe_url %>'
                },
                {
                  match: 'IFRAME_COLLECTOR',
                  replacement: '<%= pkg.iframe_collector %>'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['src/*.js', 'test/*.html'], dest: '<%= pkg.test_home %>'},
              {expand: true, flatten: true, src: ['test/iframe/*.html'], dest: '<%= pkg.test_home %>' + '/iframe'},
            ]
          }
        },
        s3: {
          options: {
            bucket: 'enbritely-artifacts',
            headers: {
              'CacheControl': 'max-age=3600'
            },
            cache: false
          },
          copy_to_s3: {
            cwd: "dist/",
            src: "*.js",
            dest: "gerbil/releases/" + '<%= pkg.version %>' + '/'
          },
        },
        route53: {
          options: {
            cache: false,
            zones: {
              'enbrite.ly.': [{
                  aliasTarget: {
                   DNSName: "dualstack.display-tracker-1359144845.us-east-1.elb.amazonaws.com.",
                   EvaluateTargetHealth: true,
                   HostedZoneId: "Z3QPO1HQ51UBLD"
                  },
                  name: 'dc-'+grunt.option('wsid')+'.enbrite.ly.',
                  type: 'A'
              }]
            }
          }
        },
        exec: {
          deploy: 'aws s3 cp s3://enbritely-artifacts/gerbil/releases/' + grunt.option('gv') + '/gerbil-' + grunt.option('gv') + '.js s3://enbritely-assets/dist/' + grunt.option('wsid') + '/gerbil.js'
        },
        watch: {
            files: ["src/*.js"],
            tasks: ['clean', 'jshint', 'replace:test']
        },
    });
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-cloudfront');
    grunt.loadNpmTasks('grunt-aws');

    grunt.registerTask('default', ['clean', 'jshint', 'replace', 'removelogging:dist', 'uglify', 'compress', 'rename']);
    grunt.registerTask('dist', ['clean', 'jshint', 'replace', 'removelogging:dist', 'uglify', 'compress', 'rename', 's3:copy_to_s3']);
    grunt.registerTask('deploy', ['exec:deploy']);
    grunt.registerTask('test', ['clean', 'copy', 'jshint', 'replace:test']);
};
