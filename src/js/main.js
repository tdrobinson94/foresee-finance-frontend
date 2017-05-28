//import angular and router
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-cookies';

//import config and constant
import {config} from './utilities/config';
// import { serverConstant } from './utilities/constant';
// import { run } from './utilities/run';

//import services
import {CalendarService} from './services/calendar.service';
// import { UserService } from './services/user.service';

//import controllers
import {CalendarController} from './controllers/calendar.controller';
import {HomeController} from './controllers/home.controller';
import {LayoutController} from './controllers/layout.controller';
import { LoginController } from './controllers/login.controller';
import { SignUpController } from './controllers/signup.controller';

angular
  .module('app', [ 'ui.router', 'ngMaterial', 'ngCookies'])
  .config(config)
  // .constant('SERVER', serverConstant)
  // .run(run)
  .service('CalendarService', CalendarService)
  // .service('UserService', UserService)
  .controller('CalendarController', CalendarController)
  .controller('HomeController', HomeController)
  .controller('LayoutController', LayoutController)
  .controller('LoginController', LoginController)
  .controller('SignUpController', SignUpController)

;
