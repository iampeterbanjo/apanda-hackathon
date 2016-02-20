module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/css/main.css': 'public/css/main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/css/*.scss'],
                tasks: ['sass']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['sass']);
};



