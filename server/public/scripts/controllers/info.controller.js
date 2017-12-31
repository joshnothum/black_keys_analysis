myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.lyrics = UserService.songObject.data;

  vm.getLyrics = function () {

    UserService.getLyrics();
    
  };
});
