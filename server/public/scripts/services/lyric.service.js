myApp.service('LyricService', function ($http, $location) {
    let self = this;
    self.black = [];
    self.green = [];
    //function removes escape characters from lyrics and counts word occurence
    function wordFreq(string) {
        let words = string.toLowerCase().replace(/[.]/g, '').split(/\s/);
        let freqLyric = {};
        words.forEach(function (lyric) {
            console.log("lyric", lyric);
            if(lyric==""|| lyric.length <= 2){
                
            }
            
            else{
             if (!freqLyric[lyric]) {
                freqLyric[lyric] = 0;
            }
            freqLyric[lyric] += 1;
        }
        });
        return freqLyric;
    }
    self.getLyrics = function () {
        return $http.get('/user/lyrics').then(function (response) {
            let freq = wordFreq(response.data[0].lyrics.lyrics);
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