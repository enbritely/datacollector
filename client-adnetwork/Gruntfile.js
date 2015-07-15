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
                    src: ['src/gerbil.js'],
                    dest: 'dist'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/gerbil.js'],
                    dest: '<%= pkg.test_home %>'
                }]
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
            files: ["src/*.js"],
            options: {}
        },
        watch: {
            files: ['<%= jshint.files %>', "src/*.js", "enbritely/page/*.html", "enbritely/iframe/*.html"],
            tasks: ['clean', 'copy:test_to_enbritely_dir', 'replace:test', 'copy:enbritely_to_www_dir']
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
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'removelogging:dist', 'uglify', 'compress', 'rename']);
    grunt.registerTask('test', ['clean', 'jshint', 'copy:test']);
};
