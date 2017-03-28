
/**
 * Bootstrap and start the game.
 */
var game;

$(function () {
    game = new window.Game($('.GameCanvas'));
});

$(document).on("keypress", function (e) {
    if (e.keyCode === 109) {
        game.mute();
    }
    if (e.keyCode === 114) {
        if (!game.isPlaying) {
            $('.SplashScreen').removeClass('is-visible');
            game.start();
        }
    }
});

$('.SplashScreen').find('.SplashScreen-start').click(() => {
    $('.SplashScreen').removeClass('is-visible');
    console.log('main');
    if (!game.isPlaying) {
        game.start();
    }
});