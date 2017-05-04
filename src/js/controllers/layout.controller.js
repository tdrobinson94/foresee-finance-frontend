import $ from 'jquery';

function LayoutController($state, $rootScope, /*UserService*/){

  // let vm = this;
  // vm.logOut = logOut;
  // vm.loggedIn = false;
  //
  // vm.init = init;
  //
  // $rootScope.$on('loginChange', function(event, status){
  //   vm.loggedIn = status;
  // });
  //
  // function logOut(){
  //   UserService.logOut();
  //   $state.go("root.home");
  // }
  //
  //
  // function init() {
  //   vm.loggedIn = UserService.loggedIn();
  // };
  // init();

  hamburgerHandler();


  function hamburgerHandler() {
    $(".hamburger").on("click", () => {
      $('.hamburger').toggleClass('is-active');
      $('.links').toggleClass('display');
      $('.container').toggleClass('push');
      $('body').toggleClass('no-scroll');
    });
  };

  $('.link').on('click', () => {
    $('.hamburger').toggleClass('is-active');
    $('.links').toggleClass('display');
    $('.container').toggleClass('push');
    $('body').toggleClass('no-scroll');
  })

  $('.links').height($(window).height());
}

LayoutController.$inject = ['$state', '$rootScope' /*, 'UserService'*/];

export {LayoutController};
