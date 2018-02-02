myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  // https://images.genius.com/5512159208ae395e4de9c28f1981f1ee.600x600x1.jpg

});
