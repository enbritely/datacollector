module.exports = function(grunt) {
  var distFile = 'dist/<%= pkg.asset_name %>.js';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['config/' + grunt.option('config') + '/config.js'],
          dest: 'dist/'
        }, {
          expand: true,
          flatten: true,
          src: ['src/*.js'],
          dest: 'dist'
        }, ]
      }
    },
    browserify: {
      client: {
        src: ['dist/skeloton.js', 'config/' + grunt.option('config') + '/config.json', 'lib/*.js', "node_modules"],
        dest: distFile,
        options: {}
      }
    },
    uglify: {
      options: {
        mangle: false,
        preserveComments: false
      },
      my_target: {
        files: {
          'dist/<%= pkg.asset_name %>-min.js': [distFile]
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'config/**/*.js', 'test/**/*.js', '.jshintrc'],
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
        cwd: 'dist/',
        src: ['<%= pkg.asset_name %>-min.js'],
        dest: 'dist/'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['clean', 'copy:main', 'jshint', 'browserify']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clean', 'jshint', 'copy:main', 'browserify', 'uglify', 'compress']);
};
