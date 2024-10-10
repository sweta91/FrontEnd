var breaks = [];
$(document).ready(function(){

     // *************** Active menu links*************
     $(document).on('click', '.link-nav a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 88
        }, 1000);
    }); 
    var addClassOnScroll = function() {
        var windowTop = $(window).scrollTop();
        $('.section-scroll').each(function(index, elem) {
            var offsetTop = $(elem).offset().top - 88;
            var outerHeight = $(this).outerHeight(true);
    
            if(windowTop > (offsetTop - 88) && windowTop < (offsetTop + outerHeight)) {
                var elemId = $(elem).attr('id');
                $(".link-nav ul li a.active").removeClass('active');
                $(".link-nav ul li a[href='#" + elemId + "']").addClass('active');
            }
            // var linkTxt = $(".link-nav ul li a.active").text();
            // $(".product-details .link-title").append(linkTxt);
        });
    };
    
    //Attach scroll event listener
    $(window).on('scroll', function() {
        addClassOnScroll();
    });
    // *************** Link Calculations ****************

    if ($(window).width() > 767) {
     var $navWrapper = $('.link-nav-wrapper');
         var $nav = $('.link-nav');
         var $btn = $('.link-nav button.btn-q-class');
         var $vlinks = $('.link-nav .visible-links');
         var $hlinks = $('.link-nav .hidden-links');       
         var $logo = $('.link-nav .logo-sm');
         var $consultationCta = $('.link-nav .start-consultation-cta');
 
         function updateNav() {                        
            var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;
            if($navWrapper.hasClass('stick')){
               $actualvlinks = ($vlinks.width() + $logo.width() + $consultationCta.width());
               availableSpace = (availableSpace - $logo.width() - $consultationCta.width());            
            }
             // The visible list is overflowing the nav
             if($vlinks.width() > availableSpace) {
 
                 // Record the width of the list
                 breaks.push($vlinks.width());
 
                 // Move item to the hidden list
                 $vlinks.children().last().prependTo($hlinks);
                 
                 // Show the dropdown btn
                 if($btn.hasClass('hidden')) {
                     $btn.removeClass('hidden');
                 }
 
             // The visible list is not overflowing
             } else {
                 // There is space for another item in the nav
                 if(availableSpace > breaks[breaks.length-1]) {
                     // Move the item to the visible list
                     $hlinks.children().first().appendTo($vlinks);
                     breaks.pop();
                 }
 
                 // Hide the dropdown btn if hidden list is empty
                 if(breaks.length < 1) {
                     $btn.addClass('hidden');
                     $hlinks.addClass('hidden');
                 }
             }            
             // Keep counter updated
             $btn.attr("count", breaks.length);
             // Recur if the visible list is still overflowing the nav
             if($vlinks.width() > availableSpace) {
                 updateNav();             
             }
 
         }
 
 // Window listeners
     $(window).scroll(function() {            
         updateNav();
     });
 
         $(window).resize(function() {            
             updateNav();
         });
 
         $btn.on('click', function() {
             $hlinks.toggleClass('hidden');
         });
 
       setTimeout(updateNav(), 200);
 
     } 
     $(".link-title").on('click', function() {
         $(".link-nav .visible-links").toggleClass("open");
         $(this).toggleClass("open");
     });
     $(".link-nav .visible-links li a").on('click', function() {
         var activeTxt = $(this).text();
         $(".link-title p span").text(activeTxt);
         
     });
    
 });

 // *******************Sticky ***************
$(window).on('scroll', function() {
    addClassStick();
});
$(document).ready(function() {
   addClassStick();
});

function addClassStick(){        
    var linkw = $(".link-nav-wrapper");	
    var hsticky = $(".link-nav-wrapper").offset().top;   //921   
    var wintop = $(window).scrollTop();

    if (wintop >= hsticky) {
        linkw.addClass("stick");
    } else {          
        linkw.removeClass("stick");	
    }
}