myApp.service('LyricService', function ($http, $location) {
    let self = this;
    self.black = [];
    self.green = [];
    self.topTen = [];
    //function removes escape characters from lyrics and counts word occurence
    function wordFreq(string) {
        let words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
        let freqLyric = {};
        words.forEach(function (lyric) {
            console.log("lyric", lyric);
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
        return freqLyric;
    }

    // function separateLyrics (array){
    //     for(let i = 0; i < array.length; i++ ){
    //         wordFreq(array.data[0].lyrics);
    //     }

    // };
    self.getLyrics = function () {
        return $http.get('/lyric/track').then(function (response) {
            let freq = wordFreq(response.data[0].lyrics);
            Object.keys(freq).sort().forEach(function (word) {
                //push each individual word into array for chart labels in controller
                self.black.push(word);
                //push each word occurence count into array for chart data in controller
                self.green.push(freq[word]);
            });
            return self.black;
        });
    };

});