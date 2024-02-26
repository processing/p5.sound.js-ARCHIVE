/**
 *  Please see the contributor docs for usage of the build steps.
 *  This header will only describe some of the more obscure tasks.
 *
 *  Contributors list can be updated using all-contributors-cli:
 *  https://www.npmjs.com/package/all-contributors-cli
 *
 *  all-contributors generate - Generates new contributors list for README
 */

// these requires allow us to use es6 features such as
// `import`/`export` and `async`/`await` in the Grunt tasks
// we load from other files (`tasks/`)
require('regenerator-runtime/runtime');
require('@babel/register');

module.exports = grunt => {
  const connectConfig = open => {
    return {
      options: {
        directory: {
          path: './',
          options: {
            icons: true
          }
        },
        port: 9001,
        open,
        middleware: function(connect, options, middlewares) {
          middlewares.unshift(
            require('connect-modrewrite')([
              '^/assets/js/p5.sound(\\.min)?\\.js(.*) /lib/p5.sound$1.js$2 [L]'
            ]),
            function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', '*');
              return next();
            }
          );
          return middlewares;
        }
      }
    };
  };

  const gruntConfig = {
    // read in the package, used for knowing the current version, et al.
    pkg: grunt.file.readJSON('package.json'),

    // Configure style consistency checking for this file, the source, and the tests.
    eslint: {
      options: {
        format: 'unix'
      },
      build: {
        src: [
          'Gruntfile.js',
          'docs/preprocessor.js',
          'utils/**/*.js',
          'tasks/**/*.js'
        ]
      },
      source: {
        options: {
          configFile: './.eslintrc',
          fix: true
        },
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js', '!test/js/*.js']
      },
      fix: {
        // src: is calculated below...
        options: {
          rules: {
            'no-undef': 0,
            'no-unused-vars': 0
          },
          fix: true
        }
      }
    },

    'eslint-samples': {
      options: {
        parserOptions: {
          ecmaVersion: 8
        },
        format: 'unix'
      },
      source: {
        src: ['src/**/*.js']
      },
      fix: {
        options: {
          fix: true
        }
      }
    },

    // Set up the watch task, used for live-reloading during development.
    // This watches both the codebase and the yuidoc theme.  Changing the
    // code touches files within the theme, so it will also recompile the
    // documentation.
    watch: {
      quick: {
        files: [
          'src/**/*.js'
        ],
        tasks: ['browserify:dev'],
        options: {
          livereload: true
        }
      },
      // Watch the codebase for changes
      main: {
        files: ['src/**/*.js'],
        tasks: ['newer:eslint:source', 'test'],
        options: {
          livereload: true
        }
      },
      // watch the theme for changes
      reference_build: {
        files: ['docs/yuidoc-p5-theme/**/*'],
        tasks: ['yuidoc'],
        options: {
          livereload: true,
          interrupt: true
        }
      },
      // Watch the codebase for doc updates
      // launch with 'grunt yui connect:yui watch:yui'
      yui: {
        files: [
          'src/**/*.js'
        ],
        tasks: [
          'browserify',
          'browserify:min',
          'yuidoc:prod',
          'clean:reference',
          'minjson',
          'uglify'
        ],
        options: {
          livereload: true
        }
      }
    },

    // Set up node-side (non-browser) mocha tests.
    mochaTest: {
      test: {
        src: ['test/node/**/*.js'],
        options: {
          reporter: 'spec',
          require: '@babel/register',
          ui: 'tdd'
        }
      }
    },

    // Set up the mocha task, used for running the automated tests.
    mochaChrome: {
      yui: {
        options: {
          urls: ['http://localhost:9001/test/test-reference.html']
        }
      },
      test: {
        options: {
          urls: [
            'http://localhost:9001/test/test.html',
            'http://localhost:9001/test/test-minified.html'
          ]
        }
      }
    },

    nyc: {
      report: {
        options: {
          reporter: ['text-summary', 'html', 'json']
        }
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'lib/p5.sound.pre-min.js': 'lib/p5.sound.js'
        }
      }
    },

    // This minifies the javascript into a single file and adds a banner to the
    // front of the file.
    uglify: {
      options: {
        compress: {
          global_defs: {
            IS_MINIFIED: true
          }
        },
        banner:
          '/*! p5.sound.js v<%= pkg.version %> <%= grunt.template.today("mmmm dd, yyyy") %> */ '
      },
      dist: {
        files: {
          'lib/p5.sound.min.js': ['lib/p5.sound.pre-min.js'],
          'lib/modules/p5.sound.Custom.min.js': ['lib/modules/p5.sound.Custom.pre-min.js']
        }
      }
    },

    // this builds the documentation for the codebase.
    yuidoc: {
      prod: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: ['src/'],
          themedir: 'docs/yuidoc-p5-theme/',
          helpers: ['docs/yuidoc-p5-theme/helpers/helpers_prod.js'],
          preprocessor: './docs/preprocessor.js',
          outdir: 'docs/reference/'
        }
      }
    },

    clean: {
      // Clean up unused files generated by yuidoc
      reference: {
        src: [
          'docs/reference/classes/',
          'docs/reference/elements/',
          'docs/reference/files/',
          'docs/reference/modules/',
          'docs/reference/api.js'
        ]
      },
      // Clean up files generated by release build
      release: {
        src: ['release/']
      },
      bower: {
        src: ['bower-repo/']
      }
    },

    // Static assets copy task. Used by release steps.
    copy: {
      release: {
        expand: true,
        src: [
          'lib/p5.sound.js',
          'lib/p5.sound.min.js'
        ],
        dest: 'release/',
        flatten: true
      },
      bower: {
        files: [
          {
            expand: true,
            src: ['lib/p5.sound.js', 'lib/p5.sound.min.js'],
            dest: 'bower-repo/'
          }
        ]
      }
    },

    // Compresses the lib folder into the release zip archive.
    // Used by the release step.
    compress: {
      main: {
        options: {
          archive: 'release/p5.sound.zip'
        },
        files: [
          {
            cwd: 'lib/',
            src: [
              'p5.sound.js',
              'p5.sound.min.js',
              'empty-example/*',
              'README.txt'
            ],
            expand: true
          }
        ]
      }
    },

    // This is a static server which is used when testing connectivity for the
    // p5sound library. This avoids needing an internet connection to run the tests.
    // It serves all the files in the test directory at http://localhost:9001/
    connect: {
      server: connectConfig(),
      yui: connectConfig('http://127.0.0.1:9001/docs/reference/')
    },

    // This minifies the data.json file created from the inline reference
    minjson: {
      compile: {
        files: {
          './docs/reference/data.min.json': './docs/reference/data.json'
        }
      }
    }
  };

  // eslint fixes everything it checks:
  gruntConfig.eslint.fix.src = Object.keys(gruntConfig.eslint).reduce(
    (acc, key) => {
      if (gruntConfig.eslint[key].src) {
        acc.push(...gruntConfig.eslint[key].src);
      }
      return acc;
    },
    []
  );


  grunt.initConfig(gruntConfig);

  // Load build tasks.
  // This contains the complete build task ("browserify")
  // and the task to generate user select modules of p5
  // ("combineModules") which can be invoked directly by
  // `grunt combineModules:module_1:module_2` where core
  // is included by default in all combinations always.
  // NOTE: "module_x" is the name of it's folder in /src.
  grunt.loadTasks('tasks/build');

  // Load release task
  grunt.loadTasks('tasks/release');

  // Load tasks for testing
  grunt.loadTasks('tasks/test');

  // Load the external libraries used.
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-minjson');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-simple-nyc');

  // Create the multitasks.
  grunt.registerTask('build', [
    'browserify',
    'browserify:min',
    'uglify',
    'browserify:test'
  ]);
  grunt.registerTask('lint', ['lint:source', 'lint:samples']);
  grunt.registerTask('lint:source', [
    'eslint:build',
    'eslint:source',
    'eslint:test'
  ]);
  grunt.registerTask('lint:samples', [
    'yui', // required for eslint-samples
    'eslint-samples:source'
  ]);
  grunt.registerTask('lint-fix', ['eslint:fix']);
  grunt.registerTask('test', [
    'build',
    'connect:server',
    'mochaChrome',
    'mochaTest',
    'nyc:report'
  ]);
  grunt.registerTask('test:nobuild', [
    'eslint:test',
    'connect:server',
    'mochaChrome',
    'mochaTest',
    'nyc:report'
  ]);
  grunt.registerTask('yui', ['yuidoc:prod', 'clean:reference', 'minjson']);
  grunt.registerTask('yui:test', ['yui', 'connect:yui', 'mochaChrome:yui']);
  grunt.registerTask('yui:dev', ['yui', 'build', 'connect:yui', 'watch:yui']);

  // This is called by the "prepublishOnly" script in package.json to build the
  // documentation and the library after np bumps up the version number so that
  // the newly built files with the updated version number can be published.
  grunt.registerTask('prerelease', ['yui', 'build']);

  grunt.registerTask('default', ['lint', 'test']);
};
