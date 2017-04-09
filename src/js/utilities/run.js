import $ from 'jquery';
function run($rootScope, UserService, $state){


  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (!UserService.loggedIn() && toState.name !== 'root.login' && toState.name !== 'root.signup' && toState.name !== 'root.home'){
      event.preventDefault();
      $state.go('root.home');
    }
  })

  $rootScope.$on('$stateChangeSuccess', function(event, toState){
    // console.log("broadcasting login change");
    $rootScope.$broadcast('loginChange', UserService.loggedIn());
    $('body').animate({scrollTop: '0px'}, 250);
  })

}

run.$inject = ['$rootScope', 'UserService', '$state'];

export { run };
