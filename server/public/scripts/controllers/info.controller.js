myApp.controller('InfoController', function (LyricService) {
  console.log('InfoController created');
  var vm = this;
  let ctx = "myChart";
  vm.albumInfo = LyricService.album;

  vm.getAlbum = function () {
    LyricService.getAlbum();


  };
  vm.getLyrics = function () {
    LyricService.getLyrics().then(function () {
    });
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: LyricService.chartLabels,
        datasets: [{
          label: 'Occurences',
          data: LyricService.chartValues,
          backgroundColor: LyricService.colorsArray,
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

  vm.getAlbum();
});
