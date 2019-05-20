$(document).ready(function() { 
    $(".select-game").click(
        function() {
            var index = $(".select-game").index(this);
            if(index == 0) {
                window.location.href = "speed_draw";
            } else if(index == 1) {
                window.location.href = "guess_draw";
            } else if(index == 2) {
                window.location.href = "draw_together";
            } else if(index == 3) {
                window.location.href = "about";
            }
        }
    );
    $("#return-home").click(
        function() {
            window.location.href = "../";
        }
    );
    $('#signup-btn').click(
        function() {
            window.location.href = "signup";
        }
    );
    $('#start-captcha-btn').click(
        function() {
            $('#start-captcha-btn').hide();
            $('#loading-text').show();
            start();
        }   
    );
    $('#new-word').click(
        function() {
            erase();
            displayMissionWord();
        }
    );
    $('#re-draw').click(
        function() {
            erase();
        }   
    );
    
});