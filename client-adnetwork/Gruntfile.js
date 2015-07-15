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
                    src: ['src/en.js', 'src/en-ss.js', 'src/en-dc.js', 'src/gerbil.js', 'src/gerbil2.js'],
                    dest: 'dist'
                }]
            },
            test_to_enbritely_dir: {
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
                }]
            },
            enbritely_to_www_dir: {
                files: [{
                    expand: true,
                    src: ['enbritely/**'],
                    dest: '/var/www/'
                }]
            }
        },
        environments: {
            options: {
                local_path: 'dist',
                current_symlink: 'current',
                deploy_path: '/usr/share/nginx/html/',
                privateKey: require('fs').readFileSync('F:/_projektek/enbritely/keys/dmlab_prod.pem')
            },
            staging: {
                options: {
                    host: '<%= secret.staging.host %>',
                    username: '<%= secret.staging.username %>',
                    password: '<%= secret.staging.password %>',
                    port: '<%= secret.staging.port %>',
                    debug: true,
                    releases_to_keep: '3'
                }
            }
        },
        rename: {
            gerbil_js_gz: {
                src: 'dist/gerbil.js.gz',
                dest: 'dist/gerbil-<%= pkg.version %>.js.gz'
            },
            gerbil_js: {
                src: 'dist/gerbil.js',
                dest: 'dist/gerbil-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                report: 'min',
                squeeze: {
                    dead_code: true
                },
                mangle: true
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
            files: ['src/**/*.js', '.jshintrc'],
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
                src: ['dist/*.js']
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
            files: ['<%= jshint.files %>', "src/*.js", "enbritely/page/*.html", "enbritely/iframe/*.html"],
            tasks: ['clean', 'copy:test_to_enbritely_dir', 'replace:test', 'copy:enbritely_to_www_dir']
        },
        'replace': {
            default: {
                options: {
                    patterns: [{
                        match: 'GERBIL_URL',
                        replacement: grunt.option('gerbil_url')
                    }, {
                        match: 'COLLECTOR_URL',
                        replacement: grunt.option('collector_url')
                    }, {
                        match: 'WSID',
                        replacement: grunt.option('wsid')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dist/en-dc.js', 'dist/en-ss.js', 'dist/en.js'],
                    dest: 'dist/'
                }]
            },
            test: {
                options: {
                    patterns: [{
                        match: 'GERBIL_URL',
                        replacement: grunt.option('gerbil_url')
                    }, {
                        match: 'COLLECTOR_URL',
                        replacement: grunt.option('collector_url')
                    }, {
                        match: 'WSID',
                        replacement: grunt.option('wsid')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['enbritely/en/en-dc.js', 'enbritely/en/en-ss.js', 'enbritely/en/en.js'],
                    dest: 'enbritely/en/'
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
    grunt.loadNpmTasks('grunt-rename');
    grunt.loadNpmTasks('grunt-ssh-deploy');
    grunt.registerTask('gerbil2', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'uglify', 'compress']);
    grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'replace:default', 'uglify', 'jsbeautifier', 'compress', 'rename:gerbil_js', 'rename:gerbil_js_gz']);
    grunt.registerTask('test', ['clean', 'copy:test_to_enbritely_dir', 'replace:test', 'copy:enbritely_to_www_dir']);
    grunt.registerTask('deploy', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'replace:default', 'uglify', 'jsbeautifier', 'compress', 'cloudfiles']);
};
