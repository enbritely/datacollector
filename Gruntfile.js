module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        dist: {
            // the files to concatenate
            src: ['src/**/*.js'],
            // the location of the resulting JS file
            dest: 'dist/<%= pkg.version %>/<%= pkg.title %>.js'
        }
    },
});
  grunt.loadNpmTasks('grunt-contrib-concat');
  // runt.file.mkdir( join(init.destpath(), 'myDir1') );
  grunt.registerTask('default', ['concat']);
};