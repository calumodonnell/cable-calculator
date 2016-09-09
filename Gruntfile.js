/*jslint browser: true, plusplus: true*/
/*global $, jQuery, alert, module*/

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        paths: {
            src: {
                js: 'admin/js/build/*.js'
            },
            dest: {
                js: 'admin/js/custom.js',
                jsMin: 'admin/js/custom.min.js'
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.js %>'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                sourceMap: true
            },
            build: {
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.jsMin %>'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.sass',
                    'admin/css/style.css': 'admin/sass/style.sass'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'css/style.css': 'css/style.css',
                    'admin/css/style.css': 'admin/css/style.css'
                }
            }
        },
        watch: {
            scripts: {
                files: ['admin/js/**/*.js', 'js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['admin/sass/**/*.sass', 'sass/**/*.sass'],
                tasks: ['sass', 'autoprefixer']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'autoprefixer', 'watch']);
};
