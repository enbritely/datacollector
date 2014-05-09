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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat', 'uglify']);
};