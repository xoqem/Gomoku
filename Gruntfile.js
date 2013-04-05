module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner_text: 'Weather v<%= meta.version %> - ' +
        'https://github.com/sinfree/Weather - <%= grunt.template.today("isoDateTime") %>',
      banner: '/* <%= meta.banner_text %> */\n',
      html_banner: '<!-- <%= meta.banner_text %> -->\n'
    },
    clean: [ 'dist', 'tmp'],
    compress: {
      debug: {
        options: {
          archive: 'dist/debug.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      },
      release: {
        options: {
          archive: 'dist/release.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/release', src: ['*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      }
    },
    concat: {
      css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['css/**/*.css'],
        dest: 'tmp/debug/styles.css'
      },
      js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['js/**/*.js'],
        dest: 'tmp/debug/main.js'
      },
      index: {
        options: {
          banner: '<%= meta.html_banner %>'
        },
        src: ['html/index.html'],
        dest: 'tmp/debug/index.html'
      }
    },
    copy: {
      images: {
        files: [
          {expand: true, cwd: 'images', src: ['**'], dest: 'tmp/debug/images/'}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['**'], dest: 'tmp/release/'}
        ]
      }
    },
    cssmin: {
      release: {
        files: {
          "tmp/release/styles.css": ["tmp/release/styles.css"]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'tmp/release/main.js': ['tmp/release/main.js']
        }
      }
    },
    watch: {
      js: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'concat:js']
      },
      css: {
        files: 'css/**/*.css',
        tasks: ['concat:css']
      },
      html: {
        files: 'html/**/*.html',
        tasks: ['concat:index']
      },
      images: {
        files: 'images/**',
        tasks: ['copy:images']
      }
    },
    jshint: {
      files: ['js/**/*.js'],
      options: {
        globals: {
          $: false,
          App: true,
          console: false
        }
      }
    }
  });

  // load dependencies
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // default task
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'copy', 'uglify', 'cssmin', 'compress', 'sleep']);
  grunt.registerTask('test', []);

  // HACK: add sleep task that we call after compress, because grunt compress plugin is saying its done before the compress completes
  grunt.registerTask('sleep', function() {
    setTimeout(this.async(), 2000);
  });
};
