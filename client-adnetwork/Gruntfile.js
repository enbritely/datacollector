module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/gerbil.js', 'src/en.js', 'src/en-ss.js', 'src/en-dc.js'],
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
                    src: ['src/en.js', 'src/en-dc.js', 'src/en-ss.js'],
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
                    src: ['dist/en-dc.js', 'dist/en-ss.js', 'dist/en.js', 'dist/gerbil.js'],
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
                src: "dist/**/*.js"
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
                src: ['dist/en.js', 'dist/gerbil.js', 'dist/en-dc.js', 'dist/en-ss.js']
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
            impression_test: {
                options: {
                    patterns: [{
                        match: 'GERBIL_URL',
                        replacement: grunt.option('gerbil_url')
                    }, {
                        match: 'COLLECTOR_URL',
                        replacement: grunt.option('collector_url')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/en-dc.js', 'dist/en-ss.js', 'dist/en.js'],
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
    grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'replace:impression_test', 'uglify', 'jsbeautifier', 'compress']);
    grunt.registerTask('test', ['clean', 'jshint', 'copy:test', 'jsbeautifier']);
    grunt.registerTask('deploy', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'replace:impression_test', 'uglify', 'jsbeautifier', 'compress', 'cloudfiles']);
};
