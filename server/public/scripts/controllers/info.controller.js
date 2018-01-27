myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.songInfo = UserService.songObject;
  let ctx = "myChart";
  let barlength = UserService.black.length;
  let colorsArray = [];


  vm.getLyrics = function () {
    UserService.getLyrics().then(function(){
      
      UserService.black.forEach(function (words) {
        let getColor = getRandomColor();
        colorsArray.push(getColor);
      });
      console.log(colorsArray);
    });
    
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: UserService.black,
        datasets: [{
          label: '# of Votes',
          data: UserService.green,
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

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    
    return color;
  }
});
