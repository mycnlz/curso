var buttonOpenCloseForm = $('.b-form');
var boxForm = $('.box-form');
var boxInfo = $('.box-info');

var openLoginInfo = function() { 

    buttonOpenCloseForm.css("opacity","0.01");
    boxForm.css("left","-37%");
    boxInfo.css("right","-37%");
}

var closeLoginInfo = function() {

    buttonOpenCloseForm.css("opacity","1");
    boxForm.css("left","0px");
    boxInfo.css("right","-5px"); 
}

var submitForm = function() {

    $("#do_login").click(function(event) { 

        event.preventDefault();
        closeLoginInfo();

        var proceed = true;
        $("fieldset").each(function(){
            var thisInput = $(this).find("input");
            var thisValida = $(this).find('span');
            thisValida.hide();
            thisValida.removeClass();
            thisValida.addClass("i");

            if(!$.trim(thisInput.val())){
                thisValida.addClass("i-warning");
                thisValida.show();  
                proceed = false;
            }
        });

        if(proceed){
            var thisValida = $("fieldset").find('span');
            thisValida.addClass("i-ok");
            thisValida.show();
        }
    });
}

var aposInicializado = function() {

    submitForm();

    $("fieldset input").keyup(function() { 
        $(this).parent().find('span').hide();
    });
 
    openLoginInfo();
    setTimeout(closeLoginInfo, 1000);
}

$(window).on('resize', function(){ closeLoginInfo(); });

$(aposInicializado);