# node-angular-seed — the seed for AngularJS apps with express server

This project is based on angular-seed,we use angular 1.21 and bootstrap 3.0 here,and we've made some changes:
1.using express server instead web-server.js
2.using grunt to run unit test and e2e test at front side,remove all scripts
3.using grunt and same jasmine to run unit test at server side
4.import bootstrap3 for mobile devices friendly
5.using grunt to build release
6.install karma only with global

## How to use node-angular-seed

Clone the angular-seed repository and start hacking...

* Set environment variable NODE_PATH
    C:\Users\Administrator\AppData\Roaming\npm\node_modules
* Set environment variable PHANTOMJS_BIN for phantomjs browser
    C:/Users/Administrator/AppData/Roaming/npm/node_modules/phantomjs/lib/phantom/phantomjs.exe
* Set environment variable CHROME_BIN for chrome browser
    C:\Program Files (x86)\Google\Chrome\Application\CHROME\chrome.exe
* install global npm packages
npm install -g grunt-cli karma karma-ng-scenario jasmine jasmine-node phantomjs
* Note:restart your computer
* install npm packages
    npm install


### Running the app during development

You can using grunt to start server
    grunt server
Then navigate your browser to `http://localhost:<port>` to see the app running in your browser.


### Running tests

We recommend using [jasmine](https://jasmine.github.io/) and
[Karma](http://karma-runner.github.io) for your unit tests/specs, but you are free
to use whatever works for you.

* grunt UnitTest
    a browser will start and connect to the Karma server (phantomjs is default browser, others can be captured by loading
  the same url as the one in phantomjs or by changing the `karma.conf.js` file)
* grunt ServerTest
    run unit test for server side.we use jasine-node here.
* grunt E2eTest
    auto start express server,run e2e test at front side,then stop express server
* grunt test
    run server side unit test,then auto start express server,run unit test and e2e test at front side.


### How to build

*  grunt
build is the default task,run grunt without parameters,just mean:
 clean dist folder
 run unit test at server side
 start express server
 run unit test and e2e test at front side
 stop express server
 copy app and server folder to dist
 compress html and js file in app folder
 then you could copy dist folder anywhere and run it as production


## Contact

For more information , you could join QQ group 119874409.
anymore,if you could help us at this project,don't mean to contact me,you are wellcome.

