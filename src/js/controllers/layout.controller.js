import $ from 'jquery';

function LayoutController(){

  hamburgerHandler();

  function hamburgerHandler() {
    $(".hamburger").on("click", () => {
      $('.hamburger').toggleClass('is-active');
      $('.links').toggleClass('display');
      $('.container').toggleClass('push');
    });
  };
}

LayoutController.$inject = ['$state', '$rootScope'];

export {LayoutController};
