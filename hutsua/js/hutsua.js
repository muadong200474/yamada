/* Fixed bottom topbanner */
$(function () {
  $(document).scroll(function () {
    if ($(this).scrollTop() > 100) {
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

  let offset = $('header').height();

  $(document).on('click', '.nav-container a', function (event) {
    let hash = this.hash;
    let $target = $(hash);

    if ($target.length) {
      $('html,body')
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top - 50,
          },
          300,
          function () {
            if (history.pushState) {
              history.pushState(null, null, hash);
            }
          },
        );

      event.preventDefault();
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
  // var now = new Date();
  // var deadline = new Date(localStorage.getItem('deadline'));
  // if (deadline == 'Invalid Date' || deadline < now) {
  //   localStorage.setItem(
  //     'deadline',
  //     new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  //   );
  //   deadline = new Date(localStorage.getItem('deadline'));
  // }

  // $('.days').html(
  //   `${now.getFullYear()}/${
  //     now.getMonth() + 1
  //   }/${now.getDate()} - ${deadline.getFullYear()}/${
  //     deadline.getMonth() + 1
  //   }/${deadline.getDate()}`
  // );
  var now = new Date();
  var prev = new Date(Date.now() - 24 * 60 * 60 * 1000);
  $('.days').html(
    `${prev.getFullYear()}/${
      prev.getMonth() + 1
    }/${prev.getDate()} - ${now.getFullYear()}/${
      now.getMonth() + 1
    }/${now.getDate()}`,
  );

  /*  Slick Slider
  ========================================================*/
  $('.slider-center').slick({
    lazyLoad: 'ondemand',
    infinite: true,
    autoplay: true,
    prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    nextArrow: '<button class="slide-arrow next-arrow"></button>',
    autoplaySpeed: 3000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  /* Display message
  ========================================================*/
  var dataURL =
    'https://script.google.com/macros/s/AKfycbxxIHKjGHJAX6HvP-ECGe8kl9OkO3cAPBi3a9KhAepXC5SPWUU/exec';
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
          KH <strong>${item[1]}</strong> có SĐT là <strong>${
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
});
