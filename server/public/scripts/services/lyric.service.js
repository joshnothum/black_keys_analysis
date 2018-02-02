myApp.service('LyricService', function ($http, $location) {
    const self = this;
    const freqLyric = {};
    self.chartLabels = [];
    self.chartValues = [];
    self.colorsArray = []; // empty array to store random colors

    //function removes escape characters from lyrics and counts word occurence
    function wordFreq(songLyrics) {
        //set all lyrics to lowerCase to Capital letters do not create duplicates
        let words = songLyrics.toLowerCase().replace(/[.]/g, '').split(/\s/);

        words.forEach(function (lyric) {
            //check for two character or less and 'the
            if (lyric.length <= 3) {
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
    //function to make an array of objects that are ordered by word occurence
    function sortedArray(freqLyric) {
        lyricsArray = Object.keys(freqLyric).map(function (lyric) {
            //returns object
            return {
                word: lyric,
                total: freqLyric[lyric]
            };
        });
        lyricsArray.sort(function (a, b) {
            return b.total - a.total;
        });
        return lyricsArray;
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    self.getLyrics = function () {
        return $http.get('/lyric/track').then(function (response) {
            // for loop to count all the tracks in the data array. Allows count for album
            for (let i = 0; i < response.data.length; i++) {
                wordFreq(response.data[i].lyrics);
            }
            //reduces number in chart to top 15 word occurences with slice method
            let whiteKeys = sortedArray(freqLyric).slice(0, 16);

            //for loop  to separtate labels and chartValues
            for (let i = 0; i < whiteKeys.length; i++) {
                self.chartLabels.push(whiteKeys[i].word);
                self.colorsArray.push(getRandomColor());
                self.chartValues.push(whiteKeys[i].total);
            }
        });
    };
});