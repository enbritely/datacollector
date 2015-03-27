module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/gerbil.js', 'src/en.js', 'src/en-dc.js'],
                    dest: 'dist'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/gerbil.js'],
                    dest: 'enbritely/js'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['src/en.js', 'src/en-dc.js'],
                    dest: 'enbritely/en'
                }, {
                    expand: true,
                    src: ['enbritely/**'],
                    dest: '/var/www/'
                }]
            }
        },
        uglify: {
            options: {
                report: 'min',
                squeeze: {
                    dead_code: false
                },
                mangle: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['dist/*.js'],
                    ext: '.js'
                }],
            },
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', '.jshintrc'],
            options: {
                reporter: require('jshint-stylish'),
                force: true,
                jshintrc: true
            }

        },
        removelogging: {
            dist: {
                src: "dist/**/*.js" // Each file will be overwritten with the output!
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
                src: ['dist/en.js', 'dist/gerbil.js', 'dist/en-dc.js']
            }
        },
        jsbeautifier: {
            files: ["src/*.js", 'Gruntfile.js'],
            options: {}
        },
        cloudfiles: {
            prod: {
                'user': 'gulyasm',
                'key': '7970cedcbb6b4e1c95d2fab949cb2ee6',
                'region': 'IAD',
                'upload': [{
                    'container': 'client-scripts',
                    'src': 'dist/gerbil.js*',
                    'dest': grunt.option('wsid') + '/',
                    'stripcomponents': 1,
                    'purge': {
                        'emails': ['mgulyas86@gmail.com'],
                        'files': ['gerbil.js', 'gerbil.js.gz']
                    }
                }]
            }
        },
        watch: {
            files: ['<%= jshint.files %>', "lib/*.js"],
            tasks: ['clean', 'copy:main', 'jshint', 'jsbeautifier']
        },
        'replace': {
            prod: {
                options: {
                    patterns: [{
                        match: 'the_gerbil_url',
                        replacement: "http://2b49fa8f0c16a03e1592-2366b89f86f9049a8d564854bcebe54e.r94.cf5.rackcdn.com/impression-test/en-dc.js"
                    }, {
                        match: 'collector_url',
                        replacement: "http://bd-dev-collector-ivo-1326709857.us-east-1.elb.amazonaws.com/"
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'dist/en-dc.js',
                    dest: 'dist/'
                }]
            }
        }
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
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-replace');
    grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'uglify', 'jsbeautifier', 'compress']);
    grunt.registerTask('testcollector', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'replace', 'uglify', 'jsbeautifier', 'compress']);
    grunt.registerTask('test', ['clean', 'jshint', 'copy:test', 'jsbeautifier']);
    grunt.registerTask('deploy', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'uglify', 'jsbeautifier', 'compress', 'cloudfiles']);
};
