module.exports = function(grunt) {
  var distFile = 'dist/<%= pkg.name %>.js';
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
        copy: {
         main: {
          files: [
          {expand: true, flatten: true, src: ['src/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['public/**/*'], dest: 'dist/', filter: 'isFile'},
          ]
        }
      },
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js', '.jshintrc'],
        options: {
          reporter: require('jshint-stylish'),
          force: true,
          jshintrc: true
        }

      },
      browserify: {
        client: {
         src: ['src/**/*.js'],
         dest: 'dist/client.js',
         options: {
         }
       }
     },
     watch: {
      files: ['<%= jshint.files %>', 'src/**/*.html'],
      tasks: ['clean', 'jshint', 'browserify','copy']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clear', 'jshint', 'browserify' ,'copy']);
};