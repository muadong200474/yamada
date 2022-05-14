$(function () {
  'use strict';

  $(document).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('nav').addClass('fixed-top');
    } else {
      $('nav').removeClass('fixed-top');
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
    `${prev.getDate()}/${
      prev.getMonth() + 1
    }/${prev.getFullYear()} - ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`,
  );

  /* Tien ich
    ========================================================*/

  for (var i = 1; i <= 7; i++) {
    $('.slider-center').append(`
      <div>
        <img
          data-lazy="image/review${i}.jpg"
          alt="ảnh review ${i}"
          class="img-fluid"
        />
      </div>
    `);
  }

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

  var dataURL =
    'https://script.google.com/macros/s/AKfycbxccF9tfPvWJScddI8BOquUK47nuX4tQOHkBqZOJcim8ZM2PqIkwKzDmLgZUBdZch_W/exec';

  /* Display message
  ========================================================*/
  var arrays = [];

  $.ajax({
    type: 'GET',
    url: dataURL,
    dataType: 'json',
    crossDomain: true,
    success: function (response) {
      arrays = response.data;
    },
  });

  function randTime(data) {
    return data[Math.floor(data.length * Math.random())];
  }

  function displayMessage() {
    var timeArray = new Array(12500, 14500, 16500);

    var item = arrays[Math.floor(Math.random() * arrays.length)];
    $('.toast').show();
    $('.toast-body').html(
      `<img src="${item[0]}" class="special-img">
        Khách hàng <strong>${item[1]}</strong> có SĐT là <strong>${
        item[2].slice(0, 7) + 'xxx'
      }</strong> ở <strong>${item[3]}</strong> đã đặt hàng`,
    );
    $('.toast').delay(4000).fadeOut(800);

    clearInterval(timer);
    timer = setInterval(displayMessage, randTime(timeArray));
  }
  var timer = setInterval(displayMessage, 5000);

  $('.close').on('click', function () {
    $('.toast').hide();
  });

  $('.warranty-btn').on('click', function (e) {
    e.preventDefault();
    var target = $('#warranty-section').offset().top - 100;
    $('html, body').animate({ scrollTop: target }, 500);
  });
});
