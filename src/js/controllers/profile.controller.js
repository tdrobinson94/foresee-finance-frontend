import $ from 'jquery';

function ProfileController($scope){
    let vm = this;

    vm.openAccountPopup = openAccountPopup;

    function openAccountPopup(){
        $('.popup-container').addClass('show');
    }

    $('.popup-container').click(function( event ) {
      var target = $( event.target );
      if (target.is(".popup-container")) {
          //========= click outside of the card to close popup ========//
          $('.popup-container').removeClass('show');
      } else if (target.is(".setup-card")){
          //========== if click is inside the card nothing will happen ========//
      } else if (target.is(".close")){
          //====== click the X to close popup =======//
          $('.popup-container').removeClass('show');
      }
      else if(target.is(".submit-transaction")){
          $('.popup-container').removeClass('show');
      }
    });
}

ProfileController.$inject = ['$scope'];

export { ProfileController };
