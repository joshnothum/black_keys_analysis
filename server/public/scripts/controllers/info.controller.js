myApp.controller('InfoController', function (LyricService) {
  console.log('InfoController created');
  const vm = this;
  const ctx = document.getElementById("myChart").getContext('2d');
 
  vm.albumInfo = LyricService.album;

  vm.getAlbum = function () {
    LyricService.getAlbum();
    //get album is called at the bottom of page so that it runs when the controller loads
  };
  vm.getLyrics = function () {
    LyricService.getLyrics().then(function () {

    const myChart = new Chart(ctx, {
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    });
  };
  // vm.getGenius = function () {
  //   LyricService.getGenius();

  // };
  
  vm.getAlbum();
});
