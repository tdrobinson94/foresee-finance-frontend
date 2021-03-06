import $ from 'jquery';

function LoginController($http, $state, SERVER, $cookies, UserService){

  let vm = this;
  vm.login = login;
  vm.loading = loading;
  vm.loadingIndicator = false;

  function login(user){
    vm.loadingIndicator = true;
    UserService.login(user).then(function(res){
      console.log(res.status);
      if(res.status === 200){
        $cookies.put('access_token', res.data.access_token);
        $cookies.put('user_id', res.data.id)
        $state.go('root.profile');
      } else if (res.status === 204) {
        $('.incorrectInput').html(`<span class="alert">Username or Password is incorrect! Try again, Please!</span>`)
        vm.loadingIndicator = false;
      }
      vm.user = {};
    })
  }
  function loading(){
      window.setTimeout(login(user), 7000);
  }

}


LoginController.$inject = ['$http', '$state', 'SERVER', '$cookies', 'UserService'];

export { LoginController };
