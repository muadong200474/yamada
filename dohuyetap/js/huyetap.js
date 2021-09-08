/* Fixed bottom topbanner */
$(function () {
  $(document).scroll(function () {
    if ($(this).scrollTop() > 260) {
      $('nav').addClass('fixed-top');
      $('nav').css('background-color', '#fff');
      $('nav').css('box-shadow', 'grey 0px 1px 5px');
    } else {
      $('nav').removeClass('fixed-top');
      $('nav').css('background-color', 'transparent');
      $('nav').css('box-shadow', 'none');
    }
  });
});

$(function () {
  'use strict';

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

  for (var i = 1; i <= 7; i++) {
    $('.slider-center').append(`
      <div>
        <img
          data-lazy="img/review${i}.jpg"
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
  /* Display message
  ========================================================*/
  var dataURL =
    'https://script.google.com/macros/s/AKfycbwPu8pg27OnnmoNTB_35PvksuV_QwSXepws5M2DknSI9aoQ5rk/exec';
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
      `<img src="${item[3]}" class="message-img">Khách hàng <strong>${
        item[0]
      }</strong> có SĐT là <strong>${
        item[1].slice(0, 7) + 'xxx'
      }</strong> ở <strong>${item[2]}</strong> đã đặt hàng`,
    );
    $('.toast').delay(4000).fadeOut(800);

    clearInterval(timer);
    timer = setInterval(displayMessage, randTime(timeArray));
  }
  var timer = setInterval(displayMessage, 5000);

  $('.close').on('click', function () {
    $('.toast').hide();
  });
});
