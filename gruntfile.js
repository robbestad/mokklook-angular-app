/* global describe, it, before, beforeEach, after, afterEach, module, console, setTimeout, require  */
'use strict';

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            },



            js: {
                files: ['server.js', 'app/**/*.js', 'test/**/*.js'],
                tasks: ['jshint'],
                ignoredFiles: ['gruntfile.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/assets/css/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                },
                style: 'expanded',
                debugInfo: true

            }
        },
        sass: {
            dist: {
                files: {
                    'public/css/app.css': 'scss/app.scss'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/style.min.css': ['public/css/reset.css',
                        'public/css/jquery.qtip.min.css',
                        'public/css/photoswipe/photoswipe.css',
                        'public/css/jquery-ui.1.8.16.custom.css',
                        'public/css/style.css'
                    ]
                }
            }
        },

        less: {
            dist: {
                files: {
                    'public/assets/css/style.css': 'public/assets/css/style.less'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/app.min.js': ['public/lib/jquery.qtip.min.js/index.js',
                        'public/js/photoswipe/klass.min.js',
                        'public/js/photoswipe/code.photoswipe.jquery-3.0.5.min.js',
                        'public/js/hammer/hammer.js',
                        'public/js/hammer/jquery.hammer.js',
                        'public/js/helper.js',
                        'public/js/iscroll.js',
                        'public/js/script.js']
                }
            }
        },


        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/app.js', 'test/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                args: ['dev'],
                nodeArgs: ['--debug'],
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });
                },
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3000'
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }

            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['public/css/**/*.css']
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-open');


    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'less', 'uglify', 'cssmin', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};