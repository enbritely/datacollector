module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/gerbil.js','src/en.js'],
          dest: 'dist'
        }
        ]
      }
    },
    uglify: {
        options: {
            report: 'min',
            squeeze: {dead_code: false}
        },
        all: {
            files: [{
                expand: true,
                cwd: '.',
                src: ['dist/*.js'],
                ext: '-min.js',
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
        src: ['dist/en-min.js', 'dist/gerbil-min.js']
      }
    },
    watch: {
      files: ['<%= jshint.files %>', "lib/*.js"],
      tasks: ['clean', 'copy:main', 'jshint']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'uglify', 'compress']);
};
