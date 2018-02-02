myApp.service('LyricService', function ($http, $location) {
    let self = this;
    self.black = [];
    self.green = [];
    let freqLyric ={};
    let finalArray = [];

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
       return freqLyric;
    }

function sortedArray(freqLyric) {
    finalWordsArray = Object.keys(freqLyric).map(function(lyric){
        return {
            word: lyric,
            total: freqLyric[lyric]
        };
    });
    finalWordsArray.sort(function(a,b){
        return b.total - a.total;
    });
    return finalWordsArray;
}

    self.getLyrics = function () {
        return $http.get('/lyric/track').then(function (response) {
   // for loop to count all the tracks in the data array. Allows count for album
            for(let i =0; i < response.data.length; i++){
                wordFreq(response.data[i].lyrics);
            }
            sortedArray(freqLyric).slice(0,16);
        });
    };

});