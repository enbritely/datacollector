module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/gerbil.js', 'src/en.js'],
                    dest: 'dist'
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
        compress: {
            main: {
                options: {
                    mode: 'gzip',
                    pretty: true
                },
                expand: true,
                ext: '.js.gz',
                cwd: '.',
                src: ['dist/en.js', 'dist/gerbil.js']
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
                    'dest': 'adprops/',
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
    grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'uglify', 'jsbeautifier', 'compress']);
    grunt.registerTask('deploy', ['clean', 'jshint', 'copy:main', 'uglify', 'compress', 'jsbeautifier', 'cloudfiles']);
};
