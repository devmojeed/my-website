(function ($) {

    "use strict";

    // RESPONSIVE MENU
    $('.responsive').on('click', function (e) {
        $('#mobile-menu').slideToggle();
    });

    // meanmenu
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });


    // menu toggle
    $(".main-menu li a").on('click', function () {
        if ($(window).width() < 700) {
            $("#mobile-menu").slideUp();
        }
    });

    // sticky-header

    if ($("#header").length) {
        var header = document.getElementById("sticky-header");
        var stickyPosition = header.offsetTop + header.offsetHeight;
        window.onscroll = function () {
            if (window.pageYOffset > stickyPosition) {
                header.classList.add("sticky");
                document.querySelectorAll('.page-wrap')[0].style.marginTop = header.offsetHeight + "px";
            } else {
                header.classList.remove("sticky");
                document.querySelectorAll('.page-wrap')[0].style.marginTop = "0px";
            }
        };
    }



    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function () {

                //active wow
                wow.init();

            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });



    /*------------------------------------------
       = BACK TO TOP BTN SETTING
   -------------------------------------------*/
    $("body").append("<a href='#' class='back-btn'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-btn").fadeIn("slow");
        } else {
            $("a.back-btn").fadeOut("slow");
        }
    }

    $(".back-btn").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    //  hover-active
    let rightItems = document.querySelectorAll('.ch-service-right-wrap .item');
    let leftItems = document.querySelectorAll('.service-image-group .service-image');

    rightItems.forEach((rightItem, index) => {
        rightItem.addEventListener('mouseenter', function () {
            handleHover(rightItem, leftItems[index]);
        });
    });

    function handleHover(rightItem, leftItem) {
        rightItems.forEach(item => {
            item.classList.remove('active');
            item.classList.add('item');
        });
        leftItems.forEach(item => {
            item.classList.remove('active');
            item.classList.add('service-image');
        });
        rightItem.classList.add('active');
        leftItem.classList.add('active');
    }


    /*------------------------------------------
    testimonial-active
    -------------------------------------------*/
    if ($(".testimonial-active").length) {
        $(".testimonial-active").owlCarousel({
            autoplay: true,
            smartSpeed: 2000,
            margin: 5,
            loop: true,
            items: 1,
            autoplayHoverPause: true,
            dots: true,
            arrows: true,
            navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
            nav: false,
        });
    }
    /*------------------------------------------
    testimonial-active
    -------------------------------------------*/
    if ($(".testimonial-active-s2").length) {
        $(".testimonial-active-s2").owlCarousel({
            autoplay: true,
            smartSpeed: 2000,
            margin: 30,
            loop: true,
            items: 2,
            autoplayHoverPause: true,
            dots: true,
            arrows: true,
            navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
            nav: false,
            responsive: {
                0: {
                    items: 1
                },

                550: {
                    items: 1
                },

                992: {
                    items: 2
                },

                1200: {
                    items: 2
                }
            }
        });
    }

    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function () {
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title': this.title,
                helpers: {
                    title: { type: 'inside' },
                    media: {}
                },

                beforeShow: function () {
                    $(".fancybox-wrap").addClass("portfolio-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
      = FUNFACT
  -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }



    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid = $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });
        }
    }
    masonryGridSetting();


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form-mejor").length) {
        $("#contact-form-mejor").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                subject: {
                    required: true
                }


            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact subject"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function () {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function () {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    $(document).ready(function () {
        $('.recent-work-popup').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, 
                easing: 'ease-in-out',
            }

        });

    });


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {

        preloader();

    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function () {
        toggleBackToTopBtn();
    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {

    });


})(window.jQuery);
