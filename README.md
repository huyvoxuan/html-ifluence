## Template
  - Angular 4.0
  - Some of plugins of Angular: gnx-translate, ng2-datepicker
  - Default HTML5/CSS3
  - Bootstrap
  - Angular CLI
  - Compile with AOT

## IDE Configuration
- Open Sublime Text
- Choose Preferences -> Settings - Default
- The number of spaces a tab is considered equal to "tab_size": 2
- Set to true to insert spaces when tab is pressed "translate_tabs_to_spaces": true
- Set to true to removing trailing white space on save "trim_trailing_white_space_on_save": true
- Set to true to ensure the last line of the file ends in a newline character when saving "ensure_newline_at_eof_on_save": true

## Installation
### Install NodeJS
  - Download [NodeJS](http://nodejs.org)
### Install Dependencies
  - Open Command Line and run
    * npm install
### Angular CLI
  - Tutorial [Angular-cli](https://github.com/angular/angular-cli)
    * npm install -g @angular/cli
### Compile with AOT
  - [Ahead-of-Time Compilation](https://angular.io/guide/aot-compiler)
  - Install: npm install @angular/compiler-cli @angular/platform-server --save
  - Setup file: tsconfig-aot.json
  - Run node_modules/.bin/ngc -p tsconfig-aot.json
  - Build app by command: ng build --prod -- aot
### Internationalization
  - Use [Ngx-translate](https://github.com/ngx-translate/core)
  - Install gnx-translate by following command
    * npm install @ngx-translate/core @ngx-translate/http-loader --save
### ng2-datepicker
  - Use [Ng2-datepicker](https://github.com/jkuri/ng2-datepicker)
  - Install: npm install ng2-datepicker --save
### ngx-pagination
  - Use [Ngx-pagination](https://github.com/michaelbromley/ngx-pagination)
  - Install: npm install ngx-pagination --save
### ng2-page-scroll
  - Use [Ng2-page-scroll](https://www.npmjs.com/package/ng2-page-scroll)
  - Install: npm install ng2-page-scroll --save
## Development
- Create an app
  * ng new myApp
- Run app with localhost
  * ng serve
- Build app
  * ng build
- Create Component/ Directive/ Pipe/ Service/ Class/ Guard/ Interface/ Enum/ Module
  * ng g component my-new-component
## Release
- ng build --prod
- ng build --prod --aot
## Test
- unit test
  * ng test
- end-to-end tests
  * ng e2e
