import $ from 'jquery';

function LayoutController($state, $rootScope, UserService){

  let vm = this;
  vm.logOut = logOut;
  vm.loggedIn = false;

  vm.init = init;

  $rootScope.$on('loginChange', function(event, status){
    vm.loggedIn = status;
  });

  function logOut(){
    UserService.logOut();
    $state.go("root.home");
  }


  function init() {
    vm.loggedIn = UserService.loggedIn();
  };
  init();

  hamburgerHandler();

  function preventMotion(event) {
      window.scrollTo(0,0);
      event.preventDefault();
      event.stopPropagation();
  }


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

//   if($('.links').hasClass('display')){
//     window.addEventListener("scroll", preventMotion, false);
//     window.addEventListener("touchmove", preventMotion, false);
// } else {
//     window.addEventListener("scroll", true);
//     window.addEventListener("touchmove", true);
// }

  // $('.links').height($(window).height());
}

LayoutController.$inject = ['$state', '$rootScope', 'UserService'];

export {LayoutController};
