var webpack = require("webpack");

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    /*
    Shared webpack config between karma and regular webpack task.
    */
    const webpackLoaders = {
        babel: {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react']
            }
        }
    };


    grunt.initConfig({
        webpack: {
            options: {
                entry: "./src/js/app.js",
                output: {
                    path: "dist/js/",
                    filename: "app.js",
                },
                progress: true,
            },
            dev: {
                watch: true,
                keepalive: true,
                module: {
                    loaders: [webpackLoaders.babel]
                },
                devtool: 'source-map',
            },
            prod: {
                module: {
                    loaders: [webpackLoaders.babel]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            'NODE_ENV': JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        }
                    })
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions'],
                map: true
            },
            dist: {
                files: {
                    './dist/css/main.css': './dist/css/main.css'
                }
            }
        },

        sass: {
            dist: {
                files: {
                    './dist/css/main.css': './src/css/main.scss',
                }
            }
        },

        clean: {
            css: ["./dist/css/"],
            js: ["./dist/js/"]
        },

        watch: {
            css: {
                files: ['./src/css/**/*.scss'],
                tasks: ['build-css'],
                options: {
                    spawn: false,
                }
            }
        },

        karma: {
            options: {
                captureConsole: true,
                singleRun: true,
                browsers: ['jsdom'],
                frameworks: [
                    'mocha',
                    'expect',
                    'sinon'
                ],
                preprocessors: {
                    './src/js/**/*.test.js': ['webpack', 'sourcemap'],
                },
                webpack: {
                    module: {
                        loaders: [webpackLoaders.babel]
                    },
                    devtool: 'inline-source-map',
                },
                webpackServer: {
                    noInfo: true
                },
                reporters: ['spec'],
            },
            js: {
                files: [{
                    src: './src/js/**/*.test.js'
                }]
            }
        },

        'http-server': {
            dev: {
                root: './',
                port: 3000
            }
        }

    });

    // Builds css (used for prod and dev builds as it's the same)
    grunt.registerTask('build-css', ['clean:css', 'sass', 'autoprefixer']);

    // Builds js for prod (minifies & no sourcemaps)
    grunt.registerTask('build-js', ['clean:js', 'webpack:prod'])

    // Builds everything.
    grunt.registerTask('build', ['build-js', 'build-css']);

    // Starts a watch processes
    grunt.registerTask('watch-js', ['clean:js', 'webpack:dev']);
    grunt.registerTask('watch-css', ['build-css', 'watch:css']);

    // Serve's the root's html file on localhost:3000
    grunt.registerTask('serve', ['http-server:dev']);

    // Runs tests
    grunt.registerTask('test', ['karma:js']);

}
