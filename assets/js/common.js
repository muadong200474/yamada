$(function () {
  'use strict';

  $(window).resize(function () {
    if ($(window).width() < 767) {
      $('.support-content').removeClass('active');
    }
  });

  /*  Lazy load
  ========================================================*/
  $('img.lazy').lazyload({
    effect: 'fadeIn',
    threshold: 100,
  });

  /* Countdown timer
    ========================================================*/
  var now = new Date();
  var prev = new Date(Date.now() - 24 * 60 * 60 * 1000);
  $('.days').html(
    `${prev.getFullYear()}/${
      prev.getMonth() + 1
    }/${prev.getDate()} - ${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`,
  );

  /* Support
    ========================================================*/
  $('a.btn-support').on('click', function (e) {
    e.preventDefault();
    $('.support-content').toggleClass('active');
  });

  /*  Slick Slider
    ========================================================*/
  $('.slider-center').slick({
    lazyLoad: 'ondemand',
    infinite: true,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
