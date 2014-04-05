$(document).ready(function(){
    $('.botones').attr('enabled', 'false')
    videojs("video").ready(function(){
        alert('holaaa');
      $('.botones').attr('enabled', 'true')
    });
});
function mover1(){

    var video = videojs('video');
    video.pause();
    video.currentTime(2200);
    video.play();

}

function mover2(){

    var video = videojs('video');
    video.pause();
    video.currentTime(120);
    video.play();

}