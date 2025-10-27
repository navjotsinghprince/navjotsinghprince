/************ Site Main Js *********************************************/


/*======== Window Load Function ========*/
$(window).on('load', function () {

    /*======== Preloader ========*/
    $(".loader").fadeOut();
    // $(".preloader").delay(1000).fadeOut();


    /*======== Isotope Portfolio Setup ========*/
    if ($('.portfolio-items').length) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();

        $filters.on('click', function () {
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1,
                },
                transitionDuration: '.5s'
            });
        });
    }

    /*======== Blogs Masonry Setup ========*/
    $('.blogs-masonry').isotope({ layoutMode: 'moduloColumns' });

});


/*======== Document Ready Function ========*/
$(document).ready(function () {

    "use strict";


    /*======== SimpleBar Setup ========*/
    $('.pt-page').each(function () {
        var $id = '#' + $(this).attr('id');
        new SimpleBar($($id)[0]);
    });

    /*======== Fitty Setup ========*/
    fitty('.header-name', {
        multiLine: false,
        maxSize: 20,
        minSize: 10
    });

    /*======== Active Current Link ========*/
    $('.nav-menu a').on('click', function () {
        if ($('.header-content.on').length) {
            $('.header-content').removeClass('on');
        }
    });

    /*======== Mobile Toggle Click Setup ========*/
    $('.header-toggle').on('click', function () {
        $('header .header-content').toggleClass('on');
    });

    /*========Clients OwlCarousel Setup========*/
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            500: {
                items: 3,
            },
            700: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    });

    /*========Testimonials OwlCarousel Setup========*/
    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });

    /*======== Skills Progress Animation ========*/
    if ($('.skills').length > 0) {
        var el = new SimpleBar($('#resume')[0]).getScrollElement();

        $(el).on('scroll', function () {

            $('.progress .progress-bar').each(function () {
                var bottom_object = $(this).offset().top + $(this).outerHeight();
                var bottom_window = $(window).scrollTop() + $(window).height();
                var progressWidth = $(this).data('progress-value') + '%';
                if (bottom_window > bottom_object) {
                    $(this).css({
                        width: progressWidth
                    });
                    $(this).find('.progress-value').animate({
                        countNum: parseInt(progressWidth, 10)
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $(this).text(Math.floor(this.countNum) + '%');
                        },
                        complete: function () {
                            $(this).text(this.countNum + '%');
                        }
                    });
                }
            });

        });
    }

    /*======== Portfolio Image Link Setup ========*/
    $('.portfolio-items .image-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*======== Portfolio Video Link Setup ========*/
    $('.portfolio-items .video-link').magnificPopup({
        type: 'iframe',
        gallery: {
            enabled: true
        }
    });

    /*======== Portfolio Ajax Link Setup ========*/
    ajaxPortfolioSetup($('.portfolio-items .ajax-link'), $('.ajax-portfolio-popup'));

    /*======== Portfolio Tilt Setup ========*/
    $('#portfolio .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: .6,
        reverse: true
    });

    /*======== Google Map Setup ========*/
    // if($('#map').length) {
    //     initMap();
    //  }


    /*======== Contact Form Setup ========*/
    contactFormSetup();
});


/*********** Function Ajax Portfolio Setup **********/
function ajaxPortfolioSetup($ajaxLink, $ajaxContainer) {
    $ajaxLink.on('click', function (e) {
        var link = $(this).attr('href');

        if (link === "#") {
            e.preventDefault();
            return;
        }

        $ajaxContainer.find('.content-wrap .popup-content').empty();

        $ajaxContainer.addClass('on');
        $.ajax({
            cache: false,
            headers: { "cache-control": "no-cache" },
            url: link,
            beforeSend: function () {
                $ajaxContainer.find('.ajax-loader').show();
            },
            success: function (result) {
                $ajaxContainer.find('.content-wrap .popup-content').html(result);
            },
            complete: function () {
                $ajaxContainer.find('.ajax-loader').hide();
            },
            error: function (e) {
                $ajaxContainer.find('.ajax-loader').hide();
                $ajaxContainer.find('.content-wrap .popup-content').html('<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>')
            }
        });
        e.preventDefault();
    });

    $ajaxContainer.find('.popup-close').on('click', function () {
        $ajaxContainer.removeClass('on');
    });


}


/********** Function Map Initialization **********/
function initMap() {
    var latitude = $("#map").data('latitude'),
        longitude = $("#map").data('longitude'),
        zoom = $("#map").data('zoom'),
        cordinates = new google.maps.LatLng(latitude, longitude);

    var styles = [{ "stylers": [{ "saturation": -100 }, { "gamma": 0.8 }, { "lightness": 4 }, { "visibility": "on" }] }, { "featureType": "landscape.natural", "stylers": [{ "visibility": "on" }, { "color": "#5dff00" }, { "gamma": 4.97 }, { "lightness": -5 }, { "saturation": 100 }] }];
    var mapOptions = {
        zoom: zoom,
        center: cordinates,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        styles: styles
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        position: cordinates,
        map: map,
        title: "We are here!"
    });
}

/********** Function Contact Form Setup **********/
function contactFormSetup() {

    /*======== Check Field Have Value When Page Load ========*/
    $('.input__field').each(function () {
        if ($(this).val()) {
            $(this).parent('.input').addClass('input--filled');
        } else {
            $(this).parent('.input').removeClass('input--filled');
        }
    });

    /*======== Check Field Have Value When Keyup ========*/
    $('.input__field').on('keyup', function () {
        if ($(this).val()) {
            $(this).parent('.input').addClass('input--filled');
        } else {
            $(this).parent('.input').removeClass('input--filled');
        }
    });


    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        var name = $('#cf-name').val(),
            email = $('#cf-email').val(),
            message = $('#cf-message').val(),
            $messageBox = $('#contact-form .message'),
            required = 0;


        $('.cf-validate', this).each(function () {
            if ($(this).val() == '') {
                $(this).addClass('cf-error');
                required += 1;
            } else {
                if ($(this).hasClass('cf-error')) {
                    $(this).removeClass('cf-error');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
    });
}


/********** Function Show Alert Box **********/
function showAlertBox(response, message) {
    var $alertBox = $('<div class="alert"></div>'),
        $alContainer = $('#contact-form .alert-container');
    if (response == 200) {
        $alertBox.addClass('alert-success').html(message);
        $alContainer.html($alertBox);
    } else {
        $alertBox.addClass('alert-danger').html(message);
        $alContainer.html($alertBox);
    }
    $alContainer.fadeIn(300).delay(2000).fadeOut(400);
}

