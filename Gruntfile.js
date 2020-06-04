"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks("grunt-csso");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');

  grunt.initConfig({
    clean: {
      build: ['build/']
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            'fonts/**/*.{woff,woff2}',
            'img/**/*.{gif,jpg,png,svg}',
            'js/**/*.js',
            '*.ico',
            '*.html',
            '*.php',
          ],
          dest: 'build/'
        }],
      },
      html: {
        files: [{
          expand: true,
          src: ['*.html', '*.php'],
          dest: 'build/'
        }],
      }
    },

    less: {
      styles: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      styles: {
        options: {
          processors: [
            require("autoprefixer")({browsers: ["last 3 versions"]}),
            require("css-mqpacker")({sort: true}),
            require("postcss-inline-svg")(),
          ]
        },
        src: "build/css/style.css"
      }
    },

    csso: {
      styles: {
        options: {
          report: 'gzip'
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    imagemin: {
      images: {
          options: {
              optimizationLevel: 3,
              progressive: true
          },
          files: [{
              expand: true,
              src: ['build/img/**/*.{png,jpg,gif}']
          }]
      }
    },

    svgmin: {
      svg: {
        files: [{
            expand: true,
            src: ['build/img/**/*.svg']
        }]
      }
    },

    svgstore: {
      options: {
        cleanup: true,
        prefix: 'svg-',
        symbol: {
          preserveAspectRatio: 'none'
        }
      },
      svg : {
        files: {
          'build/img/sprite.svg': ['build/img/svg-sprite/*.svg'],
        }
      }
    },

    uglify: {
      scripts: {
        files: {
          'build/js/lib.min.js': ['build/js/lib/*.js'],
          'build/js/app.min.js': ['build/js/app.js'],
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/*.php",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          // proxy: "mishka.local",
          // port: 80,
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html", "*.php"],
        tasks: ["copy:html"]
      },
      styles: {
        files: ["less/**/*.less"],
        tasks: ["styles"]
      }
    },

    "gh-pages": {
      options: {
        base: "build"
      },
      src: ["**"]
    }
  });

  grunt.registerTask("deploy", ["gh-pages"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("styles", ["less", "postcss", "csso"]);
  grunt.registerTask("svg", ["svgmin","svgstore"]);
  grunt.registerTask("build", [
    "clean",
    "copy:build",
    "styles",
    "svg",
    "uglify",
    "imagemin", // TODO
  ]);
};
