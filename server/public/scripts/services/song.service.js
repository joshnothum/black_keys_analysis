myApp.service('SongService', function ($http, $location){
const self =this;

this.getAlbumSongs = function (albumID) {
    console.log('we made it to songservice with the AlbumID', albumID);
    
    $http.get('/song/'+ albumID).then(function(response){
        console.log('getAlbumSongs response', response);
        
        
    });
};
});