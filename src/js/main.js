//import angular and router
import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import 'angular-cookies';

//import config and constant
import {config} from './utilities/config';

//import services
import {CalendarService} from './services/calendar.service';


//import controllers
import {CalendarController} from './controllers/calendar.controller';
import {HomeController} from './controllers/home.controller';
import {LayoutController} from './controllers/layout.controller';

angular
  .module('app', ['ui.router', 'ngMaterial', 'ngCookies'])
  .config(config)
  .service('CalendarService', CalendarService)
  .controller('CalendarController', CalendarController)
  .controller('HomeController', HomeController)
  .controller('LayoutController', LayoutController)



;
