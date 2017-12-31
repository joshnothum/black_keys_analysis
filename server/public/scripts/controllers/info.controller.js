myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.songInfo = UserService.songObject;

  vm.getLyrics = function () {

    UserService.getLyrics();
    
  };


  
  
  function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function (w) {
      if (!freqMap[w]) {
        freqMap[w] = 0;
      }
      freqMap[w] += 1;
    });

    return freqMap;
  }

  var freq = wordFreq("I am the big the big bull.");
  Object.keys(freq).sort().forEach(function (word) {
    console.log("count of " + word + " is " + freq[word]);
  });

  console.log(freq);
  
});
