function config($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('root', {
    templateUrl: 'templates/layout.tpl.html',
    controller: 'LayoutController as vm',
    abstract: true
  })

  .state('root.home', {
    url: '/home',
    templateUrl: 'templates/home.tpl.html',
    controller: 'HomeController as vm'
  })

  .state('root.calendar', {
    url: '/calendar',
    templateUrl: 'templates/calendar.tpl.html',
    controller: 'CalendarController as vm'
  })

  .state('root.login', {
    url:'/login',
    templateUrl: 'templates/login.tpl.html',
    controller: 'LoginController as vm'
  })

  $urlRouterProvider.otherwise('/home');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export {config};
