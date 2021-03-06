AppName.Modules.ThemeModule = (function() {
  //Dependencies
  var core = AppName.Core;

  //////////////////////
  // Private Methods //
  ////////////////////
  var _privateMethod = function() {
    // private stuff

    // var swiper = new Swiper('.swiper-container', {
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    // });
  };

  var masonryGallery = function() {
    if($('main').hasClass('gallery')) {
      $(document).on("click", '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
      });
    }
  }

  var interactiveBanner = function() {
    var windowWidth = $(window).width();
    var main = $('main');

    if (main.hasClass('home')) {
      main.mousemove(function(e) {
        var imgX = (($(window).width() / 1) - event.pageX) * 0.2;
        var imgY = (($(window).height() / 1) - event.pageY) * 0.2;
        $('.section-hero .holder-image .hero-image').css('margin-left', (-imgX + 50) + 'px');
        $('.section-hero .holder-image .hero-image').css('margin-top', (-imgY + 50) + 'px');
      })
    }
  }

  var headerScroll = function() {
    var scrolledHeight = $(window).scrollTop();
    
    if (scrolledHeight  > 50) {
      $('.header').addClass('header-scrolled');
      $('.scroll-top-trigger').addClass('active');
    }

    else {
      $('.header').removeClass('header-scrolled');
      $('.scroll-top-trigger').removeClass('active');
    }
  }

  var headerHamburger = function() {
    $('.js-navbar-open').click(function() {
      $('.navbar-menu').addClass('active');
    });

    $('.js-navbar-close').click(function() {
      $('.navbar-menu').removeClass('active');
    });
  }

  var scrollNextSection = function() {
    $('.js-scroll-next').click(function () {
      var scrollTarget = $(this.getAttribute('href'));

      if( scrollTarget.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: scrollTarget.offset().top
        }, 1000);
      }
    });
  }

  var scrollTop = function() {
    $('.js-scroll-top').click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });
  }

  var homeCarousel = function() {
    if ($('.section-awesome-vendors .slick-container').length) {
      $('.section-awesome-vendors .slick-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: $('.section-awesome-vendors .slick-prev'),
        nextArrow: $('.section-awesome-vendors .slick-next'),
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
        ]
      });
    }

    if ($('.section-awesome-vendors .slick-container').length) {
      $('.section-testimonials .slick-container').slick({
        dots: false,
        infinite: false,
        adaptiveHeight: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.section-testimonials .slick-prev'),
        nextArrow: $('.section-testimonials .slick-next'),
        responsive: [
          {
            breakpoint: 768,
            settings: {
              dots: true,
              arrows: false
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
        ]
      });
    }    
  }

  var tabActive = function() {
    if ($('.dashboard-tab').length) {
      var tabItem =  $('.dashboard-tab .tab-item');
      
      tabItem.each(function() {
        $(this).find('.tab-link').click(function() {
          tabItem.removeClass('active');
          setTimeout(function() {
            $(this).parent().addClass('active');
          }, 100);
        })
      });
    }
  }

  var uploadImage = function() {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#category-image').attr('src', e.target.result);
    }
    
    function readURL(input) {
      if (input.files && input.files[0]) {
          reader.readAsDataURL(input.files[0]);
      }
    }
    
    $("#image-upload").change(function(){
        readURL(this);
    });
  }

  var fileUploader = function() {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('.uploaded-file').attr('src', e.target.result);
    }
    
    function readURL(input) {
      if (input.files && input.files[0]) {
        reader.readAsDataURL(input.files[0]);
      }
    }
    
    $(".file-uploader").change(function() {
      readURL(this);
    });
  }

  var carouselShopBanner = function() {
    if ($('.section-banner-shop .slick-container').length) {
      $('.section-banner-shop .slick-container').slick({
        dots: false,
        // infinite: true,
        speed: 300,
        loop: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows : false,
      });
    }
  }

  var carouselProduct = function() {
    if ($('.section-products .slick-container').length) {
      $('.section-products .slick-container').slick({
        dots: false,
        // infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: $('.section-awesome-vendors .slick-prev'),
        nextArrow: $('.section-awesome-vendors .slick-next'),
        responsive: [
          {
            breakpoint: 9999,
            settings: "unslick"
          },
          {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
          },
          {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
          }
        ]
      });
    }
  }

  var carouselBestSeller = function() {
    if ($('.section-best-seller .slick-container').length) {
      $('.section-best-seller .slick-container').slick({
        dots: true,
        infinite: true,
        speed: 300,
        loop: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: $('.section-best-seller .slick-prev'),
        nextArrow: $('.section-best-seller .slick-next'),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  }

  var carouselVendors = function() {
    if ($('.section-vendors .slick-container').length) {
      $('.section-vendors .slick-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        loop: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: $('.section-vendors .slick-prev'),
        nextArrow: $('.section-vendors .slick-next'),
        responsive: [
          {
            breakpoint: 991,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            }
          },
          {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
          }
        ]
      });
    }
  }

  var carouselProductNew = function() {
    if ($('.section-product-market .holder-whats-new .slick-container').length) {
      $('.section-product-market .holder-whats-new .slick-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        loop: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        // prevArrow: $('.section-product-market .slick-prev'),
        // nextArrow: $('.section-product-market .slick-next'),
        responsive: [
          {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
          },
          {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
          }
        ]
      });
    }
  }

  var carouselProductFeatured = function() {
    if ($('.section-product-market .holder-featured .slick-container').length) {
      $('.section-product-market .holder-featured .slick-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        loop: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        // prevArrow: $('.section-product-market .slick-prev'),
        // nextArrow: $('.section-product-market .slick-next'),
        responsive: [
          {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
            }
          },
          {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
          },
          {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
          }
        ]
      });
    }
  }

  var toggleFilter = function() {
    $('.js-toggle-filter').on('click', function() {
      $('.product-shop .holder-products .holder-left').toggleClass('holder-left-close');
    });
  }

  var InitActiveHeader = function() {
    var headerShop = $('.header-shop');


    if($('main').hasClass('about-scm')) {
      headerShop.find('.header-nav .navbar-nav .nav-item').removeClass('active');
      headerShop.find('.header-nav .navbar-nav .nav-item:nth-child(5)').addClass('active');
    } else if($('main').hasClass('faqs')) {
      headerShop.find('.header-nav .navbar-nav .nav-item').removeClass('active');
      headerShop.find('.header-nav .navbar-nav .nav-item:nth-child(6)').addClass('active');
    } else if($('main').hasClass('vendor-shop')) {
      headerShop.find('.header-nav .navbar-nav .nav-item').removeClass('active');
      headerShop.find('.header-nav .navbar-nav .nav-item:nth-child(4)').addClass('active');
    } else if($('main').hasClass('product-shop')) {
      headerShop.find('.header-nav .navbar-nav .nav-item').removeClass('active');
      headerShop.find('.header-nav .navbar-nav .nav-item:nth-child(2)').addClass('active');
    }
  }

  /////////////////////
  // Public Methods //
  ///////////////////
  var init = function() {
    _privateMethod();

    $(window).on('load', function (event) {
      InitActiveHeader();
      interactiveBanner();
      headerScroll();
      headerHamburger();
      scrollNextSection();
      scrollTop();
      homeCarousel();
      tabActive();
      uploadImage();
      fileUploader();
      toggleFilter();
    });
  
    $(window).on('resize load', function (event) {
      carouselProduct();
      carouselBestSeller();
      carouselVendors();
      carouselProductNew();
      carouselProductFeatured();
      carouselShopBanner();
      masonryGallery();
    });

    $(window).scroll(function (event) {
      headerScroll();
      homeCarousel();
    });
  };

  return {
    init: init
  };
})();
