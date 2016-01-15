module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        webpack: {
            dist: {
                entry: "./src/js/app.js",
                output: {
                    path: "dist/js/",
                    filename: "app.js",
                },
                watch: true,
                keepalive: true,
                module: {
                    loaders: [{
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }]
                },
                devtool: 'source-map',
                progress: true,
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

    });

    grunt.registerTask('build-css', ['clean:css', 'sass', 'autoprefixer']);

    grunt.registerTask('js', ['clean:js', 'webpack']);
    grunt.registerTask('css', ['build-css', 'watch:css']);

}
