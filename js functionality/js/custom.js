//  ************** VH height calulator *******************
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
//
$(document).ready(function () {

    // **************Back to top*******************
    var Topbtn = $('.back-to-top');
    Topbtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });
    // ************* scroll top ***************
    // Detect scroll event
    $(window).scroll(function() {
        // Calculate the position of the footer relative to the window's scroll position
        var footerTop = $('footer').offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        // Check if the footer is within the viewport
        if (footerTop - scrollTop <= windowHeight) {
            // If the footer is within the viewport, hide the scrollToTop button
            $('.back-to-top').removeClass('f-sticky');
        }
        else if(jQuery(this).scrollTop() > 700)
        {
            //console.log(jQuery(this).scrollTop());
            jQuery(".back-to-top").fadeIn();
            $('.back-to-top').addClass('f-sticky');
        }
        else
        {
            jQuery(".back-to-top").fadeOut()
            
        }
    });

    // ******************************* FAQ Section ************************
    $('.faq-list .faq-card .faq-text').on("click", function () {
        $(this).next('.faq-expand').addClass("show");
    });
    $(".faq-list .faq-expand .close").on("click", function (e) {
        e.stopPropagation();
        $(this).parent(".faq-expand").removeClass("show");
    });
    if ($(window).width() < 768) {
        $('.faq-list .faq-card .faq-text').on("click", function () {
            $("body").addClass("overflow-hidden");
        });
        $(".faq-list .faq-expand .close").on("click", function (e) {
            $("body").removeClass("overflow-hidden");
        });
    }
    // ******************************* Menu Section ************************
    $(".menu").click(function () {
        $(this).addClass("opacity-zero");
        $("header").addClass("overlay");
        $("body").addClass("overflow-hidden");
        $(".navbar-menu").addClass("active");
    });
    $(".close-menu").click(function () {
        $(".menu").removeClass("opacity-zero");
        $("header").removeClass("overlay");
        $("body").removeClass("overflow-hidden");
        $(".navbar-menu").removeClass("active");
    });

     //open light-box for video
     jQuery('.open-video-lightbox').on('click', function (e) {
        e.preventDefault();
        jQuery(".video-popup").click();
        getId = jQuery(this).attr("id");
        getHref = jQuery(this).attr("href");
        jQuery(".video-holder iframe").attr("src", getHref + '&autoplay=1&d=' + Math.random());
    });
    //video pause when click on close button in light box 
    jQuery('.light-box .modal-close-btn').on('click', function (e) {
        jQuery(".video-holder iframe").attr("src", '');
    });

    //open drawer once click on class
    jQuery('.modal-btn').on('click', function (e) {
        e.preventDefault();
        jQuery("header").addClass("modal-overlay");
        var id = jQuery(this).data('id');
        jQuery('.modal[data-id="modal' + id + '"]').show('fast');
        jQuery("body").addClass("modal-open");
        jQuery('.modal[data-id="modal' + id + '"]').addClass("in");
    });
    //close drawer once click on cross icon
    jQuery('.modal-close-btn').on('click', function () {
        jQuery(".modal").removeClass("in");
      //  jQuery('.modal-overlay').fadeOut();
        jQuery("header").removeClass("modal-overlay");
        setTimeout(function () {
            jQuery('.modal').fadeOut();
            jQuery("body").removeClass("modal-open");
        }, 300);
        //remove # from URL
        history.replaceState(null, null, ' ');
    });
    
     // *************** accordian *************// 
    // Old ***
    //  jQuery(".accordion-container .accordion-block:first-child .custom-accordion-title").addClass('t-open');
    //  jQuery(".accordion-container .accordion-block:first-child .custom-accordion-content").show();
    //  jQuery(".custom-accordion-title").on("click", function () {
    //      if (jQuery(this).hasClass('t-open')) {
    //          jQuery(this).removeClass('t-open');
    //          jQuery(this).next().slideUp(500);
    //      } else {
    //          jQuery(".custom-accordion-title").removeClass('t-open');
    //          jQuery(".custom-accordion-content").slideUp(350);
    //          jQuery(this).toggleClass('t-open');
    //          jQuery(this).next().slideToggle(500);
    //      }
    //  });
    // New ***
    var faqStickyHeight = jQuery(".faq-sticky").outerHeight(); // faq page
    var NavMenuHeight = jQuery(".link-nav-wrapper .link-nav").outerHeight();  // condition product page
    jQuery(".accordion-container .accordion-block:first-child .custom-accordion-title").addClass('t-open');
    jQuery(".accordion-container .accordion-block:first-child .custom-accordion-content").show();
    jQuery(".custom-accordion-title").on("click", function () {
        var titleHeight = jQuery(this).outerHeight() + 20; 
        if (jQuery(this).hasClass('t-open')) {
            jQuery(this).removeClass('t-open');
            jQuery(this).next().slideUp(500);
        } else {
            jQuery(".custom-accordion-title").removeClass('t-open');
            jQuery(".custom-accordion-content").slideUp(350);
            jQuery(this).toggleClass('t-open');
            if(jQuery(this).parents('#footer').length) {
                jQuery(this).next().slideToggle(500); // footer accordian 
            }
            else{
                jQuery(this).next().slideToggle(500, function () {
                     if (NavMenuHeight == null && faqStickyHeight == null) {
                        // alert("terms page");
                         jQuery('html, body').animate({
                             scrollTop: jQuery(this).offset().top - titleHeight
                         }, 800);
                     }
                     else if (faqStickyHeight !== null && NavMenuHeight == null) {
                        // alert("faq page");
                        if (jQuery(window).width() >= 768) {
                            jQuery('html, body').animate({
                                scrollTop: jQuery(this).offset().top - titleHeight - faqStickyHeight
                            }, 800);
                        }
                        else{
                            jQuery('html, body').animate({
                                scrollTop: jQuery(this).offset().top - titleHeight - faqStickyHeight - 60
                            }, 800);
                        }
                     }
                     else {
                       //  alert("condition page");
                         jQuery('html, body').animate({
                             scrollTop: jQuery(this).offset().top - titleHeight - NavMenuHeight
                         }, 800);
                     }
                 });
            }
        }
    });
    // .accordian end 

     // *************** Tabbing *************// 
    $(function() {
      
        $('.tab-content:first-child').show();
        $('.tabs-nav li').bind('click', function(e) {
            $this = $(this);
            $tabs = $this.parent().parent().next();
            $target = $($this.data("target")); // get the target from data attribute
            $this.siblings().removeClass('active');
            $target.siblings().css("display", "none")
            $this.addClass('active');
            $target.fadeIn("fast");
        });
        $('.tabs-nav li:first-child').trigger('click');
    }); 
     // .Tabbing end

       

   
});    

// ********************** Condition Page*******************
$(document).ready(function () {
    //read more - less script
    var showChar = 150; // How many characters are shown by default
    var ellipsestext = "...";
    jQuery('.read-more-less-content').each(function () {
        var content = jQuery(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            if (typeof moretext === 'undefined') { moretext = 'Read more'; }
            var html = c + '<span class="moreellipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;<a href="javascript:void(0)" class="morelink">' + moretext + '</a></span>';
            jQuery(this).html(html);
        }
    });
    jQuery(".morelink").click(function () {
        if (typeof lesstext === 'undefined') { lesstext = 'Read less'; }
        if (typeof moretext === 'undefined') { moretext = 'Read more'; }
        if (jQuery(this).hasClass("less")) {
            jQuery(this).removeClass("less");
            jQuery(this).html(moretext);
        } else {
            jQuery(this).addClass("less");
            jQuery(this).html(lesstext);
        }
        jQuery(this).parent().prev().toggle();
        jQuery(this).prev().toggle();
        return false;
    });

    // how we source info modal 
    jQuery(".how-we-source-info-modal-btn").click(function (e) {
        e.stopPropagation();
        jQuery("#how-we-source-info-modal").show();
        jQuery("#how-we-source-info-modal").addClass("in");
        jQuery("header").addClass("modal-overlay");
        jQuery("body").addClass("modal-open");
    });
    jQuery("#how-we-source-info-modal .modal-close-btn, #how-we-source-info-modal .btn-close").on("click", function () {
        jQuery("#how-we-source-info-modal").hide();
        jQuery('header').removeClass('modal-overlay');
        jQuery("body").removeClass("modal-open");
        jQuery('#how-we-source-info-modal').removeClass('in');
    });

    //floating btn ********
    jQuery(window).scroll(function () {
        var scroll = jQuery(window).scrollTop();
        ctaOuterHeight = jQuery(".hero-section").outerHeight();
        if (scroll >= ctaOuterHeight) {
            jQuery('.floting-btn').addClass('in');
        } else {
            jQuery('.floting-btn').removeClass('in');
        }
    });
    //end floating btn ********
});
