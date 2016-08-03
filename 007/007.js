$(document).ready(function() {
    var ico     = $('.selection-group i');
    var drop    = $('#dropdown');
    var label	= $('#input-style');
	var option 	= drop.find('li');
    var slider	= $('#rangesize');
    var toggle	= $('#toggle');

	// open dropdown
    label.on('click', function() {
        drop.add(label).toggleClass('opened');
        ico.removeClass('ion-android-arrow-dropdown');
        ico.addClass('ion-android-close');
    });

    // select item and close dropdown
	option.on('click', function() {
		var options = $(this).find('a').html();
		label.text(options);
		drop.add(label).toggleClass('opened');
        ico.addClass('ion-android-arrow-dropdown');
        ico.removeClass('ion-android-close');

        var valor = ($('#toggle:checked').length > 0) ? 1 : 0;
        updateText(options,slider.html(),valor);
	});

    // toggle
    toggle.on('click', function () {
        var valor = ($('#toggle:checked').length > 0) ? 1 : 0;
        updateText(label.html(),slider.html(),valor);
    });
});

function updateText(style,size,italic) {
    var text = $('#text');

    if(style){
        switch (style) {
            case 'Thin': text.css('font-weight', '100'); break;
            case 'Light': text.css('font-weight', '300'); break;
            case 'Normal': text.css('font-weight', '400'); break;
            case 'Medium': text.css('font-weight', '500'); break;
            case 'Bold': text.css('font-weight', '700'); break;
            case 'Ultra-Bold': text.css('font-weight', '900'); break;
            default: text.css('font-weight', '100');
        };
    } else {
        style = 'Normal'
        text.css('font-weight', '100');
    }

    if(size){
        var size = size + 'px';
        text.css('font-size', size);
    } else {
        text.css('font-size', '130px');
    }

    if(italic){
        text.css('font-style', 'italic');
    } else {
        text.css('font-style', 'normal');
    }

    var italic = (italic == 1) ? ' Italic' : '';
    $('#texttype').html('Roboto ' + style + italic);
};

function updateSlider(){
    var slider  = $('.slider');
    var range   = $('#slider');
    var value   = $('#rangesize');
    var label   = $('#input-style');
    var toggle	= $('#toggle');

    slider.each(function(){

        value.each(function(){
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function(){
            $(this).next(value).html(this.value);

            var valor = ($('#toggle:checked').length > 0) ? 1 : 0;
            updateText(label.html(),this.value,valor);
        });
    });
};
updateSlider();
