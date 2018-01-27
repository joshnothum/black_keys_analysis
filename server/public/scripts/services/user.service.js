myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.songObject = {};
  self.black = [];
  self.green = [];

  // function that removes break
  function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqLyric = {};
    words.forEach(function (lyric) {
      if (!freqLyric[lyric]) {
        freqLyric[lyric] = 0;
      }
      freqLyric[lyric] += 1;
    });

    return freqLyric;
  }

  self.getuser = function () {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    },

    // get request for lyrics
    
  self.getLyrics = function () {
    console.log('getlyrics');
    return $http.get('/user/lyrics').then(function (response) {
      console.log('lyrics are working');

      var freq = wordFreq(response.data[0].lyrics.lyrics);
      self.songObject.count = freq;


      // sorts each word and applies a count to it
      Object.keys(freq).sort().forEach(function (word) {
        console.log("count of " + word + " is " + freq[word]);

        self.black.push(word);
        self.green.push(freq[word]);
        


      });
return self.black;
    });

  };
});
