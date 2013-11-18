module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            '../lib/angular/angular.min.js',
            '../lib/angular/angular-mocks.js',
            '../js/**/*.js',
            'unit/**/*.js'
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]
    })
}
