var webpack = require("webpack");
var express = require('express');
var path = require('path');
var morgan = require('morgan');

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

    /**
     * Since this uses client side routing we need to always serve the same
     * static html file on _any_ path.
     */
    grunt.registerTask('express-server', 'Serve index.html on all paths.', function() {
        var done = this.async();
        var app = express();

        app.use(morgan('tiny'));

        app.use(function (req, res, next) {

            // Skip static file requests
            if (path.extname(req.path).length > 0) {
                return next();
            }

            var options = {
                root: __dirname,
            };

            res.sendFile('index.html', options, (err) => {
                if (err){
                    done(err);
                }
            });
         });

        app.use(express.static(__dirname));

        app.listen(3000, function () {
            console.log('Listening on port 3000');
        });
    });


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

    // Serve the root 'index.html' on any localhost url
    grunt.registerTask('serve', ['express-server']);

    // Runs tests
    grunt.registerTask('test', ['karma:js']);

}
