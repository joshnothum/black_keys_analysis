myApp.controller('InfoController', function (LyricService) {
  console.log('InfoController created');
  var vm = this;
  vm.lyricService = LyricService;
  let ctx = "myChart";
  let colorsArray = []; // empty array to store random colors

  vm.getLyrics = function () {
    LyricService.getLyrics().then(function () {
      LyricService.black.forEach(function (words) {
        let getColor = getRandomColor();
        colorsArray.push(getColor);
      });
    });
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: LyricService.black,
        datasets: [{
          label: 'Occurences',
          data: LyricService.green,
          backgroundColor: colorsArray,
          borderColor: '#ffffff',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };
  // getRandom color creates random hex values
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
