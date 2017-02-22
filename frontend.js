quitable = false;

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var anims = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada', 'wobble', 'jello'];
var animIndex = 0;


function animate() {
	$('#main').animateCss(anims[animIndex]);
	animIndex++;
	if (animIndex == 10)
		animIndex = 0;
}

var pw = 'bitte';
var pwIndex = -1;
var clicks = 0;

$(function() {
	$('#close').click(function() {
		require('electron').remote.app.quit();
	});
});

function checkClicks() {
   clicks++;
	if (clicks == 10) 
		$('#main').text('Gib das richtige Zauberwort ein... :D');
	
	if (clicks == 20) 
		$('#main').text('Das richtige Zauberwort fangt mit B an... :D');
	
	if (clicks == 30) 
		$('#main').text('Du bist schlecht erzogen wenn Du das Zauberwort nicht kennst... :D');
		
	if (clicks == 40) 
		$('#main').text('Das Zauberwort lautet bitte, weiﬂ doch jeder... :D');
		
	if (clicks == 50) 
		require('electron').remote.app.quit();
}

window.onkeydown = function(e) {   
	checkClicks();
   
		
	if (e.keyCode == 66 && pwIndex == -1)
		pwIndex++;
	else if (e.keyCode == 73 && pwIndex == 0)
		pwIndex++;
	else if (e.keyCode == 84 && pwIndex == 1)
		pwIndex++;
	else if (e.keyCode == 84 && pwIndex == 2)
		pwIndex++;
	else if (e.keyCode == 69 && pwIndex == 3) {	
		pwIndex++;
		$('#main').hide();
		$('#correct').show();
		
		$('#correct').animateCss('rotateIn');
		
		quitable = true;
	}
	else if (pwIndex != 4) {
		pwIndex = -1;
		animate();
	}
};

window.onclick = function() {
	checkClicks();

	if (!quitable) {
		pwIndex = 0;
		animate();
	}
};