myApp.service('LyricService', function ($http, $location) {
    let self = this;
    self.black = [];
    self.green = [];
    self.topTen = [];
    let freqLyric = {};
    //function removes escape characters from lyrics and counts word occurence
    function wordFreq(string) {
        let words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
        
        words.forEach(function (lyric) {
            //check for two character or less
            if (lyric.length <= 2) {
            }
            else {
                if (!freqLyric[lyric]) {
                    freqLyric[lyric] = 0;
                }
                freqLyric[lyric] += 1;
            }
        });
       
    }
    self.getLyrics = function () {
        return $http.get('/lyric/track').then(function (response) {
  
            
   // for loop to count all the tracks in the data array. Allows count for album
                for(let i =0; i < response.data.length; i++){
                    wordFreq(response.data[i].lyrics);
            }

            
            // let newThing = Object.values(freqLyric).sort().reverse();

            // self.green = newThing.slice(0, 16);

            // console.log(self.green);
            // console.log(freqLyric);
            
            
            
            Object.keys(freqLyric).sort().reverse().slice(0, 16).forEach(function (word) {
                //push each individual word into array for chart labels in controller
                self.black.push(freqLyric);
                //push each word occurence count into array for chart data in controller
                self.green.push(freqLyric[word]);
            });
            return self.black;
        });
    };

});