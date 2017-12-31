myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.songInfo = UserService.songObject;

  vm.getLyrics = function () {

    UserService.getLyrics();
    
  };
  
  
});
