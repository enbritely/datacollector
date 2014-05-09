module.exports = function(grunt) {
  var distFile = 'dist/<%= pkg.name %>.js';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['config/' + grunt.option('config') + '/config.json', 'src/*.js'],
        // the location of the resulting JS file
        dest: distFile
      }
    },
    uglify: {
      options: {
        mangle: false,
        preserveComments: false
      },
      my_target: {
        files: {
          'dist/<%= pkg.name %>-min.js': [distFile]
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'config/**/*.js', 'config/**/*.json', '.jshintrc'],
      options: {
        reporter: require('jshint-stylish'),
        force: true,
        jshintrc: true
      }

    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint','concat']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'jshint', 'uglify']);
};