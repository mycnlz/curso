$(function() {
  var page = $('.page');
  var navBar = $('.nav');
  var navCta = $('.button-nav-cta');
  
  page.scroll( function (){
    if ($(this).scrollTop() > 70) {
      navBar.css("background-color","rgba(243,191,2,0.98)");
      navBar.css("border-bottom","1px solid #f3bf02");
    } else {
      navBar.css("background-color","transparent");
      navBar.css("border-bottom","none");
    }
    if ($(this).scrollTop() > 340) {
      navCta.css("display","block");
      navCta.removeClass("anim_fadeInLeft");
      navCta.addClass("anim_fadeInRight");
    } else {
      navCta.css("display","none");
      navCta.removeClass("anim_fadeInLeft");
      navCta.addClass("anim_slideInLeft");
    }
  });
  
  $('#scrollup').on('click', function () {
    page.animate({ scrollTop: 0 }, 800);
  });
  
  page.animate({ scrollTop: 2200 }, 0).animate({ scrollTop: 0 }, 4000);
});

function jump(h){
  var container = $('.page'), scrollTo = $('#'+h);
  container.animate({ scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 70 }, 800);
}