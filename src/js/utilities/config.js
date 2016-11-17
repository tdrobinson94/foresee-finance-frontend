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

  $urlRouterProvider.otherwise('/home');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export {config};
